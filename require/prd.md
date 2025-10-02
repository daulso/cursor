Project overview (프로젝트 개요):
이 부분은 프로젝트의 전반적인 목적과 주요 특징을 설명합니다.

이 프로젝트는 '포모도로 기법'을 기반으로 한 타이머를 통해 사용자의 생산성 향상을 돕습니다.
포모도로 기법은 25분 작업과 5분 휴식을 반복하며, 4회 작업 후에는 30분간의 긴 휴식을 취합니다.
Core functionalities (핵심 기능):
이 섹션에서는 포모도로 타이머의 주요 기능들을 나열합니다.

기능:

포모도로 타이머를 시작, 정지, 넘기기할 수 있어야 합니다.
25분 작업이 끝나면 5분간 휴식이 진행되며, 25분 작업을 4회 완료한 후에는 30분의 휴식이 주어집니다.
Doc (문서):
이 부분은 프로젝트 개발에 사용될 기술 스택과 도구들을 설명합니다.

React, TailwindCSS, TypeScript를 활용하여 웹사이트를 제작합니다.
필요한 npm 패키지를 설치하여 사용합니다.
Current file structure (현재 파일 구조):
프로젝트는 Vite + React + TypeScript + Tailwind CSS 스택으로 구성되어 있습니다.

```
cursor/
├── src/                          # 소스 코드 디렉토리
│   ├── App.tsx                   # 메인 React 컴포넌트 (포모도로 타이머 구현 예정)
│   ├── main.tsx                  # React 앱 진입점
│   └── index.css                 # Tailwind CSS 스타일 및 글로벌 스타일
├── require/                      # 프로젝트 요구사항 문서
│   └── prd.md                    # 프로젝트 요구사항 정의서 (현재 파일)
├── index.html                    # HTML 템플릿
├── package.json                  # 프로젝트 의존성 및 스크립트 정의
├── vite.config.ts               # Vite 빌드 도구 설정
├── tsconfig.json                # TypeScript 컴파일러 설정
├── tsconfig.node.json           # Node.js용 TypeScript 설정
├── tailwind.config.js           # Tailwind CSS 설정
├── postcss.config.js            # PostCSS 설정 (Tailwind CSS 처리용)
└── README.md                    # 프로젝트 설명서

주요 기술 스택:
- React 19.2.0: UI 컴포넌트 라이브러리
- TypeScript 5.9.3: 정적 타입 검사
- Vite 7.1.8: 빠른 개발 서버 및 빌드 도구
- Tailwind CSS 4.1.14: 유틸리티 우선 CSS 프레임워크
- PostCSS & Autoprefixer: CSS 후처리

개발 명령어:
- npm run dev: 개발 서버 실행 (http://localhost:5173)
- npm run build: 프로덕션 빌드
- npm run preview: 빌드 결과 미리보기
```

다음 단계: src/App.tsx를 포모도로 타이머 기능에 맞게 구현할 예정입니다.

