# FastCampus_HighPerformance

본 레포지토리는 [패스트캠퍼스 강의 링크](https://fastcampus.co.kr/dev_online_newfefinal)를 수강하며 공부한 레포지토리입니다.

## Course1 블로그앱 프로젝트

[프로젝트 README](https://github.com/minai621/FastCampus_HighPerformance/blob/main/fastcampus-blog-app/README.md)

### 요약

- React, Firebase를 이용한 리액트 블로그 프로젝트 입니다.
- 상태관리(context)
- CSS BEM 구조
- 다크모드

#### 학습 후기

CRA를 사용한 React 프로젝트에서 firebase를 사용해서 CRUD가 충실히 구현되는 블로그 앱을 구현할 수 있었다. CSS의 BEM 구조는 처음 사용해봤는데, SCSS나 styles-component와 다른 vanilla css의 맛을 오랜만에 볼 수 있었다. 역시나 다양한 선택의 폭을 갖기 위해서는 여러 방식으로 개발해보는 경험이 중요하다는 것을 배울 수 있었다. 다크모드는 [next-ui](https://nextui.org/docs/customization/dark-mode)를 사용했었는데, React에서 전역적으로 사용하는 방법을 고민해봤던 경험이 있어 빠르게 이해할 수 있었다. 디자인 시스템에서는 다크 모드를 어떻게 처리할지 조금 더 고민하며 컴포넌트를 설계해보기 위한 공부를 해야겠다고 생각이 들었다.

## 트위터 앱 프로젝트

[프로젝트 README](https://github.com/minai621/FastCampus_HighPerformance/blob/main/fastcampus-react-twitter/README.md)

### 요약

- React, Typescript, Firebase를 이용한 리액트 트위터 프로젝트 입니다.
- CRUD
- 다국어처리(Recoil)
- 미디어 쿼리

#### 학습후기

CRUD를 사용하면서 다국어처리나 미디어쿼리를 사용한 반응형 페이지에 대한 개념을 습득할 수 있었다. 관련하면서 tailwindcss는 어떻게 반응형을 처리하는지 찾아봤고, screens에 breakpoint를 정의하고 className에 breakpoint마다 style을 적는 것을 보게 되었다. 그렇다면, tailwindcss는 반응형에 다크모드까지 적용하면 코드가 지저분해질 것 같았다.
styles-component처럼 tailwindcss도 관련한 style string을 변수로 빼는 패턴이 인상적이었다.

```javascript
import React from "react";

const Text = ({ size, responsive, children }) => {
  const textSize = size ? `text-${size}` : "";
  const responsiveText = responsive
    ? "sm:md:text-lg lg:text-xl xl:text-2xl"
    : "";

  return <p className={`text ${textSize} ${responsiveText}`}>{children}</p>;
};

export default Text;
```

추가적으로 @layer나 @apply를 사용하여 css 코드를 작성하는 것도 알게 됐다. tailwindcss로는 className으로만 css를 작성했지만, stylesheet를 사용하는 것도 유용하다는 것을 느꼈다.
다국어처리에서는 useTanslation hook을 만들었는데 i18n을 사용할 때와 똑같은 사용감을 느꼈다. [react-i18next](https://github.com/i18next/react-i18next/blob/master/src/useTranslation.js)에서 useTranslation 훅을 살펴봤는데, t 함수를 통하여 key에 매핑된 다국어 문자열을 가져왔다. 복잡한 구현들은 언어 변경을 감지한다던가, 로드가 되지 않았을 때의 처리 등 고도화가 되있어 강의로 구현한 useTranslation hooks는 기본적인 내용만 구현했다는 것을 알았다.
(강의를 보면서 이미지 업로드, 좋아요, 댓글 등은 생략했다. 이미 블로그 강의에서 진행했던 내용과 같았기 때문에.. )
다국어처리와 반응형에 대해서 많이 고민할 수 있었던 좋은 파트였다.

## Next.js 맛집 서비스 프로젝트

[프로젝트 README]()

### 요약

- Next.js typescript, prisma, supabasem react-query를 이용한 리액트 블로그 프로젝트 입니다.

#### 학습전 조사

Next.js 13을 사용하기 위해 먼저 app routes와 page routes 방식의 차이점에 대해서 조사했다.
[App Route와 Pages Route 비교에 대한 좋은 칼럼](https://haesoo9410.tistory.com/404)

##### App Router

- react server components를 기반으로 구축되어 있다.
  따라서, 새로운 함수인 fetch를 사용할 수 있다. (getServerSideProps 같은 기능 없이 서버컴포넌트에 데이터를 주입한다.)
- 경로 이동 시 페이지를 re-render 하지 않고 url 업데이트 후 변경된 segment만 render (layout과 같은 부분은 변경되지 않는다. page만 변경)

##### Pages Router

- 클라이언트 중심 라우팅을 지원한다.  
  찾아보니 Pages Router는 server components를 사용할 수 없다고 한다.

###### 결론

예를 들면, 클라이언트 컴포넌트는 100만번의 api 요청이 있다면 db에 요청을 100만번 하고, 클라이언트에 캐시를 저장했다. 하지만 SSR과 server component는 db에 1번의 요청 후 캐시해두면 해결되게 된다.
또한, 요청을 감출 수 있다. 클라이언트에서 요청을 보내면, 헤더나 토큰이 노출되지만 서버에서는 그렇지 않다.

ps. 클라이언트에서 하나의 거대한 api를 호출해 자식으로 내려주는 방식과 컴포넌트에 필요한 api를 각각 호출하는 방식이 있는데, facebook은 graphql을 사용해 overfetching을 막을 수 있다고 한다. 이를 해결하기 위해 나온것이 React Server Component이다. 추가로, client에서 api 요청을 할 때에는 waterfall이 발생할 수도 있다.
