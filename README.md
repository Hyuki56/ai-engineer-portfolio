# AI Engineer Portfolio

React, TypeScript, Vite 기반의 정적 AI 엔지니어 포트폴리오입니다. 메인 페이지와 두 프로젝트 상세 페이지, 별도 PDF가 포함되어 있습니다.

## 로컬 실행

- Node.js 22 이상 권장
- 의존성 설치: npm install
- 개발 서버: npm run dev
- 프로덕션 빌드: npm run build
- 빌드 미리보기: npm run preview

## 구성

- src/App.tsx: 메인 페이지, PJ1·PJ2 프로젝트 설명과 라우팅
- src/style.css: 반응형 디자인
- public/images/surveillance-intrusion.jpg: PJ2 원본 프로젝트에서 가져온 실제 감지 스냅샷
- docs/AI_Engineer_Portfolio_KR.pdf: 입사 지원용 4페이지 PDF
- public/AI_Engineer_Portfolio_KR.pdf: 웹사이트에서 내려받는 PDF 사본
- .github/workflows/deploy.yml: GitHub Pages 배포 워크플로

## 콘텐츠 정확성

PJ1과 PJ2의 구현 설명은 지정된 원본 프로젝트 코드를 읽기 전용으로 확인해 작성했습니다. 측정되지 않은 성능 수치나 운영 실적은 기재하지 않았습니다. PJ1의 실제 브라우저 화면 캡처는 아직 포함하지 않았습니다. 이메일, GitHub 프로필 및 PJ1·PJ2 저장소 주소는 사이트와 PDF에 연결했습니다.

원본 PJ1·PJ2 프로젝트 파일은 수정하지 않았습니다. 이 포트폴리오 디렉터리에 필요한 스냅샷 사본만 포함합니다.

## GitHub Pages

Vite 상대 경로 설정과 GitHub Actions 배포 워크플로를 사용합니다. GitHub 저장소와 공개 배포는 별도 확인 후 진행합니다.
