# AGENTS.md

## Project Goal [Guides]
4주 안에 AI 기반 패션 코디 추천 서비스 프로토타입 구현

## Source of Truth
- 요구사항: docs/PRD.md
- 기준: docs/acceptance_criteria.md
- 우선순위: docs/test_cases.md High 항목

## Guides
AGENTS.md, docs/PRD.md, docs/acceptance_criteria.md
개발 전 반드시 문서를 읽고 요구사항을 준수한다

## Tools
React, TypeScript, Tailwind CSS, Vitest, Testing Library

## Sensors
npm test (기능 정상 동작 검증)
npm run build (빌드 오류 확인)
lint (코드 규칙 검사)
브라우저 콘솔 (에러 및 경고 확인)

## Permissions
요구사항(PRD, AC) 임의 수정 금지
테스트 코드 수정 금지
any 타입 사용 금지 (TypeScript 안정성 유지)
외부 API 키 하드코딩 금지
사용자 데이터 임의 생성/왜곡 금지

## Feedback Loops
테스트 실패 발생 시 → 원인 분석 및 기록
반복되는 오류 → 하네스 규칙에 추가
수정 후 재테스트 진행
동일 오류 재발 방지

## Rules
- 기능 구현 전 테스트 먼저 작성
- 테스트 실패 시 원인부터 설명
- 요구사항 임의 삭제 금지
- TypeScript any 사용 금지
