# 위드펫

![with_pet](https://github.com/ajousw-withpet/.github/blob/main/image/withpet.png)

### 프로젝트 소개

> ‘위드펫’은 반려인과 펫시터를 중개하는 플랫폼입니다.
펫시터는 반려견의 사회화 온도(사람 혹은 다른 반려견과의 사회성을 나타내는 척도)와 반려인의 애정도(반려견에 대한 관심도)를 확인하고 수락 및 거부하며 서비스를 유동적으로 관리할 수 있습니다.
> 

### 위드펫의 기능

1. 그룹 일지 작성 및 조회 기능
    - 반려인은 그룹에 소속된 반려견에 대한 일지를 작성 및 조회할 수 있습니다.
2. 원하는 조건의 펫시터 예약 기능
    - 반려인은 원하는 조건의 펫시터를 필터링하여 찾을 수 있으며 돌봄 서비스를 예약할 수 있습니다.
3. 온도 시스템 기능
    - 펫시터는 온도 정보를 조회하여 반려견의 사회성 정도와 반려인의 반려견 관심 정도를 파악한 후 예약을 승낙 및 거절할 수 있습니다.

### ajouNice 프론트엔드

| name | email | github |
| --- | --- | --- |
| 강윤지 | mailto:dbswl701@ajou.ac.kr | https://github.com/dbswl701 |
| 이재영 | mailto:joe981125@ajou.ac.kr | https://github.com/2jaeyoung2 |
| 이지현 | mailto:wlgus97@ajou.ac.kr | https://github.com/wlgus8284 |


### 배포 주소
[http://ec2-13-125-242-183.ap-northeast-2.compute.amazonaws.com](http://ec2-13-125-242-183.ap-northeast-2.compute.amazonaws.com/petlist)

<br/>

## 🛠️ skill
<h3>언어 및 라이브러리</h3> 
<div>
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"> &nbsp;
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> &nbsp;
</div>
<h3>웹서버</h3>
<div>
  <img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white"> 
</div>
<h3>AWS</h3>
<div>
  <img src="https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">&nbsp;
  <img src="https://img.shields.io/badge/s3-569A31?style=for-the-badge&logo=s3&logoColor=white">
</div>
<h3>Management</h3>
<div>
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> &nbsp;
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> &nbsp;
  <img src="https://img.shields.io/badge/githubaction-2088ff?style=for-the-badge&logo=githubaction&logoColor=white"> &nbsp;
  <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
</div>

### 프로젝트 실행 방법

```jsx
git clone https://github.com/ajousw-withpet/with_pet_frontend.git

npm install --force

npm start
```

**프론트엔드 라이브러리 및 개발환경**

- 기술스택
    - Virtual Dom 및 컴포넌트의 재사용이라는 장점으로 인해 **React** 선택
    - 서버 환경 구축을 위해 가벼우면서도 높은 성능을 가진 **Nginx** 선택
    - **AWS EC2**와 **GitHub Actions**를 통해 CICD를 구축하여 배포 자동화 시스템을 구축
- 라이브러리

| Library | version | description |
| --- | --- | --- |
| React | ^18.2.0 | 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리 |
| react-dom | ^18.2.0 | React를 DOM과 통합하기 위한 기능을 제공 |
| styled-components | ^5.3.10 | React 컴포넌트에 CSS 스타일을 적용하는 라이브러리 |
| axios | ^1.4.0 | 브라우저나 Node.js에서 HTTP 요청을 만들기 위한 라이브러리 |
| dayjs | ^1.11.7 | 날짜와 시간을 조작하고 포맷하는 라이브러리 |
| react-router-dom | ^6.11.0 | React 애플리케이션을 위한 라우팅 라이브러리 |
| react-big-calendar | ^1.6.9 | 사용자 정의 가능한 캘린더 컴포넌트 |
| react-calendar | ^4.2.1 | 사용자 정의 가능한 캘린더 컴포넌트 |
| react-dates | ^21.8.0 | 사용자 정의 가능한 캘린더 컴포넌트 |
| @mui/icons-material | ^5.11.16 | Material-UI 아이콘 모음 |
| @mui/material | ^5.12.3 | Material-UI 사용하기 위한 라이브러리 |
| @mui/x-date-pickers | ^6.4.0 | Material-UI 날짜선택기 |
- 개발환경
    - window10 / vscode
    - npm -v : 9.5.1
    - node -v : v18.16.0


<br/>
<br/>

# 폴더구조 설명

### assets

- 프로젝트에서 사용할 이미지 등 미디어 파일들을 모아두는 곳


### components

- 공통 컴포넌트 관리 (Header, Footer, Nav 등)


### pages

- 페이지 단위의 컴포넌트 폴더로 구성


```bash
src
├─assets
├─components
│  ├─Navbar
│  ├─PetsitterSidebar
│  └─UserSidebar
├─pages
│  ├─MainPage
│  ├─PetList
│  ├─PetsitterCalendar
│  ├─PetsitterDiaries
│  ├─UserDiaries
│  ├─...
│  └─AdminMainPage
└─styles

``` 

<br />

# 코딩 컨벤션
eslint를 사용하여 airbnb의 규칙을 따름
<br/>
<br/>

# 커밋 컨벤션
**type : 어떤 의도로 커밋했는지를 type에 명시**

`이모지  태그: 제목` 의 형태이며, : 뒤에만 space가 있음에 유의한다.

ex) ✨ feat: 댓글 수정 기능 추가

| 이모지 | 태그 이름 | 설명 |
| --- | --- | --- |
| ✨ | feat | 새로운 기능을 추가할 경우 |
| 🐛 |  fix | 버그를 고친 경우, 수정사항 있을 경우 |
| ➕ | add | 단순 코드 추가 등 feat이나 fix 사용하기 애매할 때 사용 |
| ♻️ | refactor | 프로덕션 코드 리팩토링 |
| ✅ | test | 테스트 추가, 테스트 리팩토링(프로덕션 코드 변경 X)
| 📝 | docs | 문서를 수정한 경우 ex) http://README.md, Spring docs |
| 🛠 | chore | 빌드 테스트 업데이트, 패키지 매니저를 설정하는 경우(프로덕션 코드 변경 X)
| 🎨 | style | 코드 포맷 변경, 세미 콜론 누락, 코드 로직 자체 수정이 없는 경우 |
| 💄 | design | CSS 등 사용자 UI 디자인 변경 |
| 🚑 | !BREAKING CHANGE | 커다란 API 변경의 경우 |
| 💣 | !HOTFIX | 급하게 치명적인 버그를 고쳐야하는 경우 |
| 💡 | comment | 필요한 주석 추가 및 변경 |
| 🚚 | rename | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우 |
| 🔥 | remove | 파일을 삭제하는 작업만 수행한 경우 |
