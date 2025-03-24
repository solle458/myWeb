'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

// フォームフィールドの検証状態を表す型
interface FieldState {
  value: string;
  isTouched: boolean;
  isValid: boolean;
}

export default function Contact() {
  // フォームフィールドの状態
  const [nameField, setNameField] = useState<FieldState>({ value: '', isTouched: false, isValid: false });
  const [emailField, setEmailField] = useState<FieldState>({ value: '', isTouched: false, isValid: false });
  const [messageField, setMessageField] = useState<FieldState>({ value: '', isTouched: false, isValid: false });
  
  // UI表示状態
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // 装飾用画像
  const backgroundImage = "/images/pc/dark1.jpg";

  // フォーム入力の検証
  const validateName = (name: string) => name.trim().length >= 2;
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateMessage = (message: string) => message.trim().length >= 10;

  // フォーム送信ハンドラー
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // すべてのフィールドを検証済みとしてマーク
    setNameField({ ...nameField, isTouched: true, isValid: validateName(nameField.value) });
    setEmailField({ ...emailField, isTouched: true, isValid: validateEmail(emailField.value) });
    setMessageField({ ...messageField, isTouched: true, isValid: validateMessage(messageField.value) });
    
    // フォームが有効な場合の処理
    if (validateName(nameField.value) && validateEmail(emailField.value) && validateMessage(messageField.value)) {
      setIsSubmitting(true);
      
      // 実際の実装ではここでAPIリクエストを行います
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 送信成功時の処理
      setSubmitResult({ success: false, message: '現在工事中のため、お問い合せは受け付けておりません。🙇‍♂️' });
      setIsSubmitting(false);
      
      // フォームをリセット
      if (formRef.current) {
        formRef.current.reset();
        setNameField({ value: '', isTouched: false, isValid: false });
        setEmailField({ value: '', isTouched: false, isValid: false });
        setMessageField({ value: '', isTouched: false, isValid: false });
      }
      
      // 3秒後に成功メッセージをクリア
      setTimeout(() => {
        setSubmitResult(null);
      }, 5000);
    }
  };

  // スクロールベースのアニメーション
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio > 0.1) {
          setIsVisible(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // 初期表示を設定
    setIsVisible(true);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // グラデーションエフェクトのスタイルを取得
  const getGradientStyle = (element: string) => {
    const isActive = hoveredElement === element;
    return {
      background: 'radial-gradient(circle, rgba(0,150,255,0.3) 0%, rgba(255,255,255,0) 70%)',
      filter: isActive ? 'blur(10px)' : 'blur(5px)',
      transform: `translate(-50%, -50%) ${isActive ? 'scale(2.2)' : 'scale(0.8)'}`,
      opacity: isActive ? 0.7 : 0,
      transition: 'all 0.7s ease',
      position: 'absolute' as const,
      left: '50%',
      top: '50%',
      width: '16rem',
      height: '16rem',
      borderRadius: '50%',
      pointerEvents: 'none' as const,
      zIndex: 0,
    };
  };

  // 入力フィールドのエラーメッセージ
  const getErrorMessage = (field: FieldState, type: 'name' | 'email' | 'message') => {
    if (field.isTouched && !field.isValid) {
      switch (type) {
        case 'name': return '名前は2文字以上入力してください';
        case 'email': return '有効なメールアドレスを入力してください';
        case 'message': return 'メッセージは10文字以上入力してください';
      }
    }
    return null;
  };

  // 入力フィールドクラスの取得
  const getFieldClasses = (field: FieldState) => {
    const baseClasses = 'w-full p-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400';
    
    if (!field.isTouched) {
      return `${baseClasses} bg-white border border-gray-300`;
    }
    
    return field.isValid
      ? `${baseClasses} bg-white border border-green-400`
      : `${baseClasses} bg-white border border-red-400`;
  };

  return (
    <main className="min-h-screen">
      {/* ヘッダー背景 */}
      <div className="relative h-64 md:h-96">
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt="Contact Header"
            layout="fill"
            objectFit="cover"
            className="brightness-75"
            priority
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            style={getGradientStyle('header')}
            className="rounded-full"
          />
          <h1 
            className="text-white text-4xl md:text-6xl font-bold relative z-10 px-8 py-4"
            onMouseEnter={() => setHoveredElement('header')}
            onMouseLeave={() => setHoveredElement(null)}
            style={{
              textShadow: hoveredElement === 'header' 
                ? '0 0 10px rgba(0,150,255,0.8)' 
                : '0 0 5px rgba(0,0,0,0.5)',
            }}
          >
            CONTACT
          </h1>
        </div>
      </div>

      {/* メインコンテンツエリア */}
      <div 
        ref={containerRef}
        className={`max-w-7xl mx-auto px-5 md:px-10 py-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="grid md:grid-cols-2 gap-12">
          {/* 左側コンテンツ - 連絡先情報 */}
          <div>
            <div 
              className="relative mb-10"
              onMouseEnter={() => setHoveredElement('contactInfo')}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <div 
                className="absolute rounded-full w-48 h-16"
                style={getGradientStyle('contactInfo')}
              />
              <h2 
                className="text-3xl font-bold mb-6 inline-block"
                style={{
                  textShadow: hoveredElement === 'contactInfo' ? '0 0 8px rgba(0,150,255,0.3)' : 'none',
                }}
              >
                お問い合わせ
              </h2>
              <p className="text-gray-700 mb-8 leading-relaxed">
                ご質問、プロジェクトのご相談、お仕事のご依頼など、お気軽にお問い合わせください。
                フォームからのメッセージをお送りいただくか、以下の連絡先までご連絡ください。
              </p>
            </div>

            {/* 連絡先詳細 */}
            <div className="space-y-6">
              <div 
                className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg transition-all duration-300 hover:bg-blue-100 hover:shadow-md"
                onMouseEnter={() => setHoveredElement('email')}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <div className="text-blue-500 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold">Eメール</h3>
                  <p className="text-gray-700">show04go@gmail.com</p>
                </div>
              </div>

              <div 
                className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg transition-all duration-300 hover:bg-blue-100 hover:shadow-md"
                onMouseEnter={() => setHoveredElement('location')}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <div className="text-blue-500 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold">所在地</h3>
                  <p className="text-gray-700">滋賀県草津市</p>
                </div>
              </div>

              <div 
                className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg transition-all duration-300 hover:bg-blue-100 hover:shadow-md"
                onMouseEnter={() => setHoveredElement('social')}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <div className="text-blue-500 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold">ソーシャルメディア</h3>
                  <div className="flex space-x-4 mt-2">
                    <a href="https://x.com/m_sh0805?s=21" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />                      
                      </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/%E7%AC%99%E4%BC%8D-%E5%AE%AE%E6%9C%A8-98009331b/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-2v-3.158c0-.526-.394-1.053-.938-1.053s-1.062.421-1.062 1.053v3.158h-2v-6h2v1.162c.506-.854 1.521-1.22 2.353-1.22 1.632 0 2.647 1.059 2.647 3.158v2.9z" />
                      </svg>
                    </a>
                    <a href="https://github.com/solle458" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右側コンテンツ - 問い合わせフォーム */}
          <div>
            <div 
              className="relative mb-8"
              onMouseEnter={() => setHoveredElement('formHeader')}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <div 
                className="absolute rounded-full w-48 h-16"
                style={getGradientStyle('formHeader')}
              />
              <h2 
                className="text-3xl font-bold mb-6 inline-block"
                style={{
                  textShadow: hoveredElement === 'formHeader' ? '0 0 8px rgba(0,150,255,0.3)' : 'none',
                }}
              >
                メッセージを送る
              </h2>
            </div>

            {/* 問い合わせフォーム */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* お名前フィールド */}
              <div>
                <label 
                  className="block mb-2 font-medium"
                  htmlFor="name"
                >
                  お名前
                </label>
                <input
                  id="name"
                  type="text"
                  className={getFieldClasses(nameField)}
                  onFocus={() => setHoveredElement('nameField')}
                  onBlur={() => {
                    setHoveredElement(null);
                    setNameField({
                      ...nameField,
                      isTouched: true,
                      isValid: validateName(nameField.value)
                    });
                  }}
                  onChange={(e) => setNameField({
                    ...nameField,
                    value: e.target.value,
                    isValid: validateName(e.target.value)
                  })}
                  required
                />
                <div 
                  className="absolute rounded-full w-32 h-32"
                  style={getGradientStyle('nameField')}
                />
                {getErrorMessage(nameField, 'name') && (
                  <p className="mt-1 text-sm text-red-500">{getErrorMessage(nameField, 'name')}</p>
                )}
              </div>

              {/* メールアドレスフィールド */}
              <div>
                <label 
                  className="block mb-2 font-medium"
                  htmlFor="email"
                >
                  メールアドレス
                </label>
                <input
                  id="email"
                  type="email"
                  className={getFieldClasses(emailField)}
                  onFocus={() => setHoveredElement('emailField')}
                  onBlur={() => {
                    setHoveredElement(null);
                    setEmailField({
                      ...emailField,
                      isTouched: true,
                      isValid: validateEmail(emailField.value)
                    });
                  }}
                  onChange={(e) => setEmailField({
                    ...emailField,
                    value: e.target.value,
                    isValid: validateEmail(e.target.value)
                  })}
                  required
                />
                <div 
                  className="absolute rounded-full w-32 h-32"
                  style={getGradientStyle('emailField')}
                />
                {getErrorMessage(emailField, 'email') && (
                  <p className="mt-1 text-sm text-red-500">{getErrorMessage(emailField, 'email')}</p>
                )}
              </div>

              {/* メッセージフィールド */}
              <div>
                <label 
                  className="block mb-2 font-medium"
                  htmlFor="message"
                >
                  メッセージ
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className={getFieldClasses(messageField)}
                  onFocus={() => setHoveredElement('messageField')}
                  onBlur={() => {
                    setHoveredElement(null);
                    setMessageField({
                      ...messageField,
                      isTouched: true,
                      isValid: validateMessage(messageField.value)
                    });
                  }}
                  onChange={(e) => setMessageField({
                    ...messageField,
                    value: e.target.value,
                    isValid: validateMessage(e.target.value)
                  })}
                  required
                />
                <div 
                  className="absolute rounded-full w-32 h-32"
                  style={getGradientStyle('messageField')}
                />
                {getErrorMessage(messageField, 'message') && (
                  <p className="mt-1 text-sm text-red-500">{getErrorMessage(messageField, 'message')}</p>
                )}
              </div>

              {/* 送信ボタン */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 bg-blue-500 text-white font-medium rounded-lg shadow-md
                    transition-all duration-300 relative
                    ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600 hover:shadow-lg'}
                  `}
                  onMouseEnter={() => setHoveredElement('submitButton')}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  <div 
                    className="absolute rounded-full w-32 h-32"
                    style={getGradientStyle('submitButton')}
                  />
                  <span className="relative z-10">
                    {isSubmitting ? '送信中...' : '送信する'}
                  </span>
                </button>
              </div>

              {/* 送信結果メッセージ */}
              {submitResult && (
                <div 
                  className={`mt-4 p-4 rounded-lg ${
                    submitResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {submitResult.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
