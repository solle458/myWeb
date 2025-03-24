import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// 型定義
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    // リクエストボディからフォームデータを取得
    const body: ContactFormData = await request.json();
    const { name, email, message } = body;

    // 基本的な検証
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: '名前、メールアドレス、メッセージは必須です。' },
        { status: 400 }
      );
    }

    // NodeMailerでメール送信のためのトランスポーターを設定
    // 注: 本番環境では環境変数を使用してください
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: Boolean(process.env.EMAIL_SECURE) || false,
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'your-app-password',
      },
    });

    // メール内容の設定
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'your-website@example.com',
      to: process.env.EMAIL_TO || 'show04go@gmail.com', // 受信者のメールアドレス
      replyTo: email,
      subject: `ウェブサイトからのお問い合わせ (${name})`,
      text: `
名前: ${name}
メールアドレス: ${email}

メッセージ:
${message}
      `,
      html: `
<div>
  <h2>ウェブサイトからのお問い合わせ</h2>
  <p><strong>名前:</strong> ${name}</p>
  <p><strong>メールアドレス:</strong> ${email}</p>
  <p><strong>メッセージ:</strong></p>
  <p>${message.replace(/\n/g, '<br>')}</p>
</div>
      `,
    };

    // メール送信処理
    await transporter.sendMail(mailOptions);

    // 成功レスポンスを返す
    return NextResponse.json({ message: 'お問い合わせが送信されました。' });
  } catch (error) {
    console.error('Contact API error:', error);
    
    // エラーレスポンスを返す
    return NextResponse.json(
      { message: 'エラーが発生しました。後でもう一度お試しください。' },
      { status: 500 }
    );
  }
}
