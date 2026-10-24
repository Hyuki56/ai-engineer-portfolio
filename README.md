# AI Engineer Portfolio

AI Engineer / AI Developer 취업 지원을 위한 반응형 웹 포트폴리오와 PDF입니다. Python 기반 RAG 코드 질의응답 서비스와 컴퓨터 비전 감시 시스템의 설계·구현 흐름을 중심으로 구성했습니다.

## 공개 링크

- 웹 포트폴리오: https://hyuki56.github.io/ai-engineer-portfolio/
- PDF 포트폴리오: https://hyuki56.github.io/ai-engineer-portfolio/AI_Engineer_Portfolio_KR.pdf
- GitHub 프로필: https://github.com/Hyuki56
- PJ1 - Codebase AI Assistant: https://github.com/Hyuki56/codebase-ai-assistant
- PJ2 - AI Smart Surveillance Platform: https://github.com/Hyuki56/AI-Smart-Surveillance-Platform

## 기술 구성

- React, TypeScript, Vite
- GitHub Actions를 통한 GitHub Pages 배포
- 별도 백엔드나 유료 AI API 없이 배포되는 정적 웹사이트

## 로컬 실행

- Node.js 22 이상 권장
- 의존성 설치: `npm install`
- 개발 서버: `npm run dev`
- 프로덕션 빌드: `npm run build`
- 빌드 미리보기: `npm run preview`

## 콘텐츠 정확성 및 화면 자료

- PJ1·PJ2의 기능 설명은 공개된 원본 프로젝트 코드와 문서에 근거해 작성했습니다.
- 측정되지 않은 정확도, 성능 향상률, 사용자 수는 기재하지 않았습니다.
- PJ1 화면 캡처는 Codebase AI Assistant가 PJ2 감시 프로젝트 저장소를 색인하고 질의한 데모입니다. PJ1 자체 저장소를 대상으로 한 캡처가 아님을 웹과 PDF에 밝혔습니다.
- 캡처에 노출된 사용자 PC의 전체 경로는 공개본에서 제거했습니다.
- 기존 PJ1·PJ2 저장소는 수정하지 않았습니다. PJ2 증거 이미지만 이 포트폴리오 저장소에 사본으로 포함합니다.

## 프로젝트 구조

- `src/App.tsx`: 메인 페이지와 PJ1·PJ2 상세 페이지
- `src/style.css`: 반응형 레이아웃과 시각 스타일
- `public/images/`: 프로젝트 화면 및 실행 증거 이미지
- `docs/AI_Engineer_Portfolio_KR.pdf`: 입사 지원용 5페이지 PDF 원본
- `public/AI_Engineer_Portfolio_KR.pdf`: 웹에서 제공하는 PDF 사본
- `.github/workflows/deploy.yml`: `main` 브랜치 변경 시 빌드·배포

## 배포

공개 웹사이트는 GitHub Pages의 `https://hyuki56.github.io/ai-engineer-portfolio/`에서 확인할 수 있습니다. `main` 브랜치에 커밋을 푸시하면 GitHub Actions가 프로덕션 빌드와 Pages 배포를 실행합니다.
