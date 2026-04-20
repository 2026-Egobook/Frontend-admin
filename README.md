# Egobook Frontend Admin

## 기술 스택
- Framework: `React`
- Language: `JavaScript`
- Styling: `Tailwind CSS`
- State: `Zustand` + `TanStack Query`
- Forms: `React Hook Form` + `Zod`


## 폴더 구조
```
src/ 
├── app/                    # 페이지 및 라우팅
│   └── [feature]/          # 기능별 페이지
│       ├── api/            # 페이지 전용 API 로직
│       ├── components/     # 페이지 전용 컴포넌트
│       ├── hooks/          # 페이지 전용 훅
│       ├── state/          # 페이지 전용 상태
│       ├── utils/          # 페이지 전용 유틸
│       └── index.jsx       # 페이지 컴포넌트
│
├── assets/                 # 정적 에셋
│   ├── icon/               # svg 아이콘
│   └── image/              # 이미지
│
└── shared/                 # 공통 코드
    ├── components/         # 재사용 컴포넌트
    ├── hooks/              # 공통 훅
    ├── api/                # API 설정 및 인스턴스
    ├── stores/             # 전역 상태 (Zustand)
    └── utils/              # 공통 유틸 함수
```

## 개발 규칙

### 파일 배치
- 페이지: `src/app/[feature]/`
- 페이지 전용 코드: `src/app/[feature]/(폴더)`
- 공통 코드: `src/shared/`
- 정적 에셋: `src/assets/`



### 네이밍
- 페이지 / 컴포넌트: `PascalCase`
- 훅: `useXxx`
- 폴더: `snake_case`
- 유틸 함수: `kebab-case`


### 컴포넌트 규칙
- 페이지 최상위 태그는 `<main>` 사용


## API 연동
- `publicAPI`: 인증 없이 호출 (로그인, 회원가입 등)  
- `privateAPI`: 인증 필요 API (JWT 기반)

```javascript
import { publicAPI, privateAPI } from "@/shared/api/apiInstance";

// 공개 API
publicAPI.post("/auth/login", data);

// 인증 API
privateAPI.get("/user/profile");
```

## 개발 프로세스
1. 브랜치 생성 (`feature/기능명`)
2. 개발 및 커밋
3. 브랜치 푸시
4. Pull Request 생성
5. 코드 리뷰 후 병합
6. 배포 진행


## Notes
- 환경 변수는 `.env`로 관리 (`.gitignore` 필수)
- 민감 정보(API Key 등)는 커밋 금지
- 코드 스타일은 `ESLint` / `Prettier` 기준 준수