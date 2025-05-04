package infrastructure

import (
	"bufio"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"
	"time"

	"backend/config"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/gmail/v1"
	"google.golang.org/api/option"
)

func NewGmailClient(cfg *config.EmailConfig) (*gmail.Service, error) {
	ctx := context.Background()

	b, err := os.ReadFile(cfg.CredentialsPath)
	if err != nil {
		return nil, fmt.Errorf("unable to read client secret file: %v", err)
	}

	config, err := google.ConfigFromJSON(b, gmail.MailGoogleComScope)
	if err != nil {
		return nil, fmt.Errorf("unable to parse client secret file to config: %v", err)
	}

	// Get OAuth2 client
	client := getClient(ctx, config)

	// Create Gmail service
	srv, err := gmail.NewService(ctx, option.WithHTTPClient(client))
	if err != nil {
		return nil, fmt.Errorf("unable to retrieve Gmail client: %v", err)
	}

	return srv, nil
}

func getClient(ctx context.Context, config *oauth2.Config) *http.Client {
	tokFile := "./config/token.json"
	tok, err := tokenFromFile(tokFile)
	if err != nil {
		tok = getTokenFromWeb(config)
		saveToken(tokFile, tok)
	}

	// 有効期限が30分以内の場合、リフレッシュを試みる
	if tok.Expiry.Before(time.Now().Add(30 * time.Minute)) {
		// リフレッシュトークンがある場合は自動更新を試みる
		if tok.RefreshToken != "" {
			log.Println("Attempting to refresh the token")
			tokenSource := config.TokenSource(ctx, tok)
			newToken, err := tokenSource.Token()
			if err != nil {
				log.Printf("Token refresh failed: %v", err)
				// リフレッシュに失敗した場合は再認証
				tok = getTokenFromWeb(config)
			} else {
				tok = newToken
				// 新しいトークンを保存
				saveToken(tokFile, tok)
			}
		} else {
			log.Println("No refresh token present, re-authenticating")
			tok = getTokenFromWeb(config)
			saveToken(tokFile, tok)
		}
	}

	return config.Client(ctx, tok)
}

func getTokenFromWeb(config *oauth2.Config) *oauth2.Token {
	// ForceApprovalを追加してリフレッシュトークンを確実に取得
	authURL := config.AuthCodeURL("state-token", oauth2.AccessTypeOffline, oauth2.ApprovalForce)
	fmt.Printf("Go to the following link in your browser then type the authorization code:\n%v\n", authURL)

	fmt.Print("Enter authorization code: ")
	reader := bufio.NewReader(os.Stdin)
	authCode, err := reader.ReadString('\n')
	if err != nil {
		log.Fatalf("Unable to read authorization code: %v", err)
	}
	authCode = strings.TrimSpace(authCode)

	authCode, err = url.QueryUnescape(authCode)
	if err != nil {
		log.Fatalf("Failed to decode auth code: %v", err)
	}

	tok, err := config.Exchange(context.Background(), authCode)
	if err != nil {
		log.Fatalf("Unable to retrieve token from web: %v", err)
	}

	// リフレッシュトークンの有無を確認
	if tok.RefreshToken == "" {
		log.Println("Warning: No refresh token received. You may need to revoke access and try again.")
	} else {
		log.Println("Successfully received refresh token")
	}

	return tok
}

func tokenFromFile(path string) (*oauth2.Token, error) {
	f, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer f.Close()

	token := &oauth2.Token{}
	err = json.NewDecoder(f).Decode(token)
	return token, err
}

func saveToken(path string, token *oauth2.Token) {
	fmt.Printf("Saving credential file to: %s\n", path)
	f, err := os.OpenFile(path, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0600)
	if err != nil {
		log.Fatalf("Unable to cache oauth token: %v", err)
	}
	defer f.Close()
	json.NewEncoder(f).Encode(token)
}
