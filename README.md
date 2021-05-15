# 🤹‍♀️ AFTER WORK - 넘쳐나는 취미 클래스를 한 눈에 !

<h4><a href="https://afterwork.co.kr/" target="_blank">사이트 바로가기</a> <a href="" target="_blank"> / Youtube 시연영상</a><h4>

베타버전 2021.05.13 ~ <mark style='background-color: yellow'>사용자 피드백 및 개선작업 진행 중</mark>
<br/>
개발기간 2021.04.25 ~ 2021.05.12
<br/>
<br/>

![image](https://user-images.githubusercontent.com/68773118/118111208-57345c80-b41e-11eb-948a-982b78a7bc50.png)

## 목차

1. [프로젝트 소개](#프로젝트-소개)
2. [사용기술](#-tools)<br/>
3. [배운 점](#-i-learned)<br/>
4. [기능정보](#-기능정보)<br/>
5. [진행과정](#-진행과정)<br/>

---

## 프로젝트 소개

**넘쳐나는 취미 플랫폼 클래스들을 한 번에 모아볼 수 있는 사이트**

- 유명 플랫폼 7개사 클래스 인기, 가격 한 번에 비교
- 구글/네이버/카톡 아이디로 간편하게 소셜 로그인
- 사용자별 관심 지역, 분야 설정 가능

**🎯 Target**

- 퇴근 후 뭐하지? 고민하는 직장인 <br/> 직장인 58% 재택근무 경험…90% “증가된 여가시간에 새 취미생활 하고파” <br/> ('20.03 직장인 소셜미디어 블라인드 설문조사 결과)
- 넘쳐나는 취미 플랫폼과 클래스 정보들로 혼란스러운 이들

### 👨‍👩‍👧‍👧 팀 구성

[팀 소개 페이지로 이동하기](https://www.notion.so/AFTER-WORK-f6996fa9da9448928340463d6f5bd851) <br/>
Front-end(React) : 3인 <br/>
Back-end(Spring) : 3인 ([Github Repo](https://github.com/seongbinko/afterwork)) <br/>
Designer : 1인 ([UI/UX Wireframe](https://xd.adobe.com/view/6930efb5-2686-4843-921c-c8a87578a9e6-3c63/grid)) <br/>

## 🛠 Tools

```
- View (React with JavaScript, React-Router, antd, Styled-components)
- State Management (Redux, Redux-Thunk, Immer, Redux-actions)
- Build Tool (Create React App)
- Code Quality Tool (ESLint, Prettier)
- Infrastructure (AWS S3, Route 53, Amazon CloudFront)
- Design Tool (Xd adobe)
- Other Tools (Git, Github, notion, Slack etc.)
```

## 🔎 I learned

## 🕹 기능정보

### 1. 소셜 로그인

- 구글, 네이버, 카카오 계정을 활용한 소셜 로그인 방식 적용

### 2. 회원 정보에 따른 클래스 추천 기능

- 비 로그인 시 로그인 후 이용할 수 있다는 안내 문구를 통해 유저 로그인 유도
- 로그인 후 회원정보를 설정할 수 있게 버튼 이동이 가능한 안내문구 사용
- 해당 유저가 관심 갖는 지역 및 카테고리 설정 시 각각 랜덤하게 12개의 클래스를 추천해줌

### 3. 카테고리별 클래스 조회

- 유명 플랫폼 7개사 클래스를 6종류의 카테고리로 분류했으며 무한스크롤 방식을 이용해 별도의 페이지 이동없이 계속해서 클래스를 조회할 수 있게 구현
- 클래스를 인기순, 가격 높은 순, 가격 낮은 순으로 정렬할 수 있고 온라인, 오프라인 클래스만 모아볼 수 있게 필터처리를 진행함

### 4. 클래스 검색 기능

- 유저가 특정 클래스를 조회할 수 있는 기능으로 검색키워드에 해당하는 클래스를 조회할 수 있음
- 카테고리별 클래스 조회 기능과 유사하게 구현했으며 정렬 및 필터처리까지 포함해 구현

### 5. 관심 클래스 추가 기능

- 로그인 시 이용할 수 있는 기능으로 관심있는 클래스를 찜목록에 추가하여 관리할 수 있음
- 관심 클래스는 상품에 있는 하트를 눌러 추가할 수 있으며 비로그인 시 로그인 모달창 활성화
- 찜목록에서는 특정 클래스 삭제 기능 및 전체 삭제가 가능함

### 6. 회원 정보 수정 및 탈퇴

- 퇴근시간, 관심 지역, 관심 카테고리 설정을 통해 회원별 클래스 추천 및 퇴근시간 카운트를 이용할 수 있음
- 퇴근시간설정 시 메인페이지에서 퇴근까지 남은 시간을 보여줌
- 관심지역 추가 시 해당 지역에 존재하는 클래스를 메인 페이지에서 추천해줌
- 관심 카테고리 추가 시 카테고리에 대한 클래스를 메인 페이지에서 추천해줌

## ⛓ 진행과정

**개발기간 2021.04.25 ~ 2021.05.12** <br/>
**사용자 피드백 및 개선기간 2021.05.13 ~ 진행 중**
<br/>
