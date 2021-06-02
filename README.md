# 🤹‍♀️ AFTER WORK - 넘쳐나는 취미 클래스를 한 눈에 !

<h4><a href="https://afterwork.co.kr/" target="_blank">사이트 바로가기</a> <a href="https://www.youtube.com/watch?v=pW9s6w0tXzg&t=13s" target="_blank"> / Youtube 시연영상</a><h4>

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

- 퇴근 후 뭐하지? 고민하는 2-30대 미혼 직장인 <br/> ('20.03 직장인 소셜미디어 블라인드 설문조사 결과) <br/> 직장인 58% 재택근무 경험…**90% “증가된 여가시간에 새 취미생활 하고파”** 
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
- Code Quality Tool (Prettier)
- Infrastructure (AWS S3, Route 53, Amazon CloudFront)
- Design Tool (Xd adobe)
- Other Tools (Git, Github, notion, Slack etc.)
```

## 🔎 I learned
  <a href="https://github.com/miniPinetree"><img src="https://avatars.githubusercontent.com/u/68773118?v=4" width="75px;" alt="Gomisong"/><br /><sub><b>고미송</b></sub></a><br />
  
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

### 5. 클래스 찜하기 기능

- 로그인 시 이용할 수 있는 기능으로 관심있는 클래스를 찜 목록에 추가하여 관리할 수 있음
- 비로그인 유저가 클릭하는 경우 로그인 모달창을 활성화하여 로그인 유도
- 하트 버튼은 토글 방식으로 작동되어 기존에 저장된 찜 상품인 경우 삭제가 수행되고 기존 찜 상품이 아닌 경우 저장처리가 수행됨.
- 찜 목록 페이지에서는 찜 목록 전체 조회 및 전체 삭제가 가능함

### 6. 회원 정보 및 관심 분야 저장 기능

- 퇴근시간, 관심 지역, 관심 카테고리 설정할 수 있으며 저장된 정보를 기반으로 회원별 클래스 추천 및 퇴근시간 카운트가 작동
- 퇴근시간은 timePicker를 이용하고 사용자 편의와 효용을 고려하여 분/초 단위 선택을 간소화함. (10분 단위, 초단위 선택 생략) 
- 관심 지역은 사용자가 검색한 키워드가 포함된 선택지를 보여주어 그 중에서만 등록이 가능하게 함. (오타나 미세한 표현상의 차이 등을 줄여 검색과 추천의 정확도를 높이고자 함.)
- 관심 카테고리는 선택 여부에 따라 좌, 우로 분리하고 체크박스 색상에 차이를 두어 인터랙티브한 느낌을 주고자 함.

## ⛓ 진행과정
**개발기간 2021.04.25 ~ 2021.05.12** <br/>
**사용자 피드백 및 개선기간 2021.05.13 ~ 진행 중**
<br/>
5.26일 기준 1,399명의 사용자를 얻었고 133건의 피드백을 수집하였습니다. 

<table>
  <tr>
    <td align="center">
    <a href="https://github.com/miniPinetree"><img src="https://avatars.githubusercontent.com/u/68773118?v=4" width="75px;" alt="Gomisong"/><br /><sub><b>고미송</b></sub></a><br />
    </td>
    <td>
    <a href="https://github.com/miniPinetree/_AfterWork/wiki/%5BMaintaner%5D-%EA%B3%A0%EB%AF%B8%EC%86%A1" title="what did I do">💻what did I do</a>
    <br/>
        <a href="https://github.com/miniPinetree/_AfterWork/commits?author=miniPinetree" title="Code">📜 Commit Log</a>
        <br/>
    </td>
    <tr>
    <td align="center"><a href="https://github.com/noh-yj"><img src="https://avatars.githubusercontent.com/u/73735372?s=64&v=4" width="75px;" alt=""/><br /><sub><b>노유진</b></sub></a><br /></td>
    <td>
    <a href="" title="what did I do">💻what did I do</a>
    <br/>
    <a href="" title="Code">📜 Commit Log</a>
    </td>
    <tr>
    <td align="center"><a href="https://github.com/euljiro"><img src="https://avatars.githubusercontent.com/u/79740061?s=64&v=4" width="75px;" alt=""/><br /><sub><b>김율아</b></sub></a><br /> </td>
    <td>
    <a href="" title="what did I do">💻what did I do</a>
    <br/>
    <a href="" title="Code">📜 Commit Log</a>
    </td>
</table>

---

### Show your support
Give a ⭐️ if this project helped you!
