# **PEACHPITCH**

PEACHPITCH는 온라인으로 프레젠테이션을 만들고 슬라이드쇼 모드로 발표를 할 수 있는 웹 어플리케이션 입니다.

[배포사이트](http://app.peach-pitch.com)

**preview**
<br />
![슬라이드 쇼 재생](https://github.com/team-dtrio/peach-pitch-client/assets/80331804/12a28bcf-4f9a-4a01-abaf-2b27f00c63f4)

# **Table of Contents**

[Intro](#intro)
<br />

[Features](#features)
<br />

[Challenges](#challenges)
<br />

- [1. 개체들의 좌표는 어떻게 설정하고, 크기 조절을 할 수 있을까?](#1-개체들의-좌표는-어떻게-설정하고-크기-조절을-할-수-있을까)
  <br />

  - [1-1. 좌표와 크기조절을 위한 기준 : 사각형과 8개의 꼭지점](#1-1-좌표와-크기조절을-위한-기준--사각형과-8개의-꼭지점)
    <br />
  - [1-2. 꼭지점마다 부여된 다른 연산방식](#1-2-꼭지점마다-부여된-다른-연산방식)
    <br/>
  - [1-3. 반대 방향의 꼭지점을 고정시켜 안정적인 크기 조절 기능 구현하기](#1-3-반대-방향의-꼭지점을-고정시켜-안정적인-크기-조절-기능-구현하기)
    <br />

- [2. 슬라이드 구현하기](#2-슬라이드-구현하기)
  <br />

  - [2-1. ppt 슬라이드, 도형 개체를 순수 자바스크립트로 구현하기](#2-1-ppt-슬라이드-도형-개체를-순수-자바스크립트로-구현하기)
    <br />
  - [2-2. 슬라이드, 미리보기, 재생 모드 동기화하기](#2-2-ppt-애니메이션을-순수-csskeyframes로-구현하기)
    <br />
  - [2-3. ppt 애니메이션을 순수 CSS(@keyframes)로 구현하기](#2-3-ppt-애니메이션을-순수-csskeyframes로-구현하기)
    <br />

- [3. 드래그 앤 드롭 인터렉션을 이용한 ppt 슬라이드 순서 변경 기능 구현](#3-드래그-앤-드롭-인터렉션을-이용한-ppt-슬라이드-순서-변경-기능-구현)

- [4. 프레젠테이션 앱에 적합한 DB 구조는?](#4-프레젠테이션-앱에-적합한-db-구조는)
  <br />

- [5. 서버와 클라이언트의 상태관리: React Query와 Context API의 결합](#5-서버와-클라이언트의-상태관리-react-query와-context-api의-결합)
  <br />

  - [5-1. react query를 이용한 자동저장 구현하기](#5-1-react-query를-이용한-자동저장-구현하기--개체의-상태와-db를-동시에-관리하기)
  - [5-2. context API의 활용 ](#5-2-context-api의-활용)

[Project Timeline](#project-timeline)
<br />

[Contribution](#contribution)
<br />

[Tech stack](#tech-stack)
<br />

[Our team](#our-team)

<br />

# **Intro**

**왜 프레젠테이션 어플리케이션인가?**

저희 팀은 저희에게 도전적이며, 동시에 동적이고 시각적인 효과를 보여 줄 수 있는 프로젝트를 구현하는 것이 목표였습니다. 익숙하지만 도전적인 프레젠테이션 어플리케이션을 구현하게 되었습니다.

<br />

# **Features**

### **내 프레젠테이션**

- 로그인 후, 사용자는 새로운 프레젠테이션을 생성할 수 있습니다.
- 내가 만든 프레젠테이션들을 볼 수 있고, 편집할 수 있습니다.
- 오른쪽 마우스 클릭으로, 내가 만든 프레젠테이션을 삭제할 수 있습니다.

### **생성 / 삭제**

- 새로운 슬라이드를 생성하고 삭제할 수 있습니다.
- 이미지를 업로드 하고 삭제 할 수 있습니다.
- 도형을 생성하고 삭제할 수 있습니다.
- 텍스트 박스를 생성하고 삭제할 수 있습니다.
- 오른쪽 마우스 클릭을 이용해 삭제할 수 있습니다.

### **편집**

- 슬라이드 위에 슬라이드를 드래그 앤 드롭하면 슬라이드의 순서가 변경됩니다.
- 이미지, 도형, 텍스트 박스의 서식을 적용할 수 있습니다. (내부 색상, 테두리 색상, 폰트, 폰트 크기, 글자 정렬)
- 각 객체의 순서를 바꿀 수 있습니다. (앞으로 보내기, 뒤로 보내기)
- 객체를 클릭 후, 애니메이션 버튼을 클릭하면 애니메이션이 적용됩니다.
- 애니메이션은 각 객체 당 최대 1개 적용 가능합니다.
- 애니메이션 순서 탭에서 오른쪽 마우스 클릭으로 적용된 애니메이션을 제거할 수 있습니다.
- 애니메이션 순서 탭에서 애니메이션이 재생될 순서를 바꿀 수 있습니다.

### **슬라이드 쇼**

- 재생버튼을 누르면 슬라이드 쇼가 재생됩니다.
- 키보드 오른쪽 방향키를 누르면 지정된 다음 슬라이드 또는 다음 애니메이션이 순서대로 재생됩니다.
  <br />
  <br />

# Challenges

## **1. 개체의 좌표는 어떻게 설정하고, 크기 조절을 할 수 있을까?**

### 1-1. 좌표와 크기조절을 위한 기준 : 사각형과 8개의 꼭지점

프레젠테이션에서 사용하는 개체는 텍스트박스, 이미지, 도형으로 분류가 됩니다. 도형 개체의 경우 삼각형, 원, 사각형으로 나뉩니다. 도형의 경우에는 각 도형마다 성질이 다르고, 무엇을 기준으로 크기를 조절하고 좌표를 설정할 수 있을지가 저희의 고민 중 하나였습니다.
<br />

어떤 개체여도 공통적으로 적용할 수 있는 기준이 필요했습니다. 현재 많은 슬라이드 어플리케이션에서 사용하고 있는 방식인 `사각형의 테두리와`, `꼭지점`을 활용해서 개체의 크기와 좌표를 조절하였습니다.

<p align="center">
<img width="748" alt="개체의 좌표와 크기 설정" src="https://github.com/team-dtrio/peach-pitch-client/assets/72593047/785d11dc-957c-4625-9aaf-3b7d06e8609c">
</p>
<br />

### 1-2. 꼭지점마다 부여된 다른 연산방식

개체를 클릭할 경우, 사각형을 둘러싸는 테두리와 8개의 꼭지점이 나타납니다. 모든 개체의 좌표는 그 개체를 둘러싸고 있는 사각형의 왼쪽 위 꼭지점이 기준이 됩니다. 아래 예시를 보면, 현재 상태에서 사이즈를 변경을 원하면, 첫번째 꼭지점(꼭지점 0)을 클릭하고 새로운 좌표인 (new x, new y)로 드래그하면, (new x, new y)까지 영역이 늘 어나고 사이즈가 업데이트 됩니다. 다만 여기서 크기조정은 우리가 알고 잇는 상식과 다르게 이뤄졌습니다.

저희는 CSS속성을 가진 스타일드 컴포넌트를 슬라이드 장표로 표현했는데, 슬라이드 장표의 좌표는 맨 왼쪽 위 꼭지점이 0,0으로 기준점이 됩니다. 예시에서의 주황색 박스의 새로운 좌표는 (new x, new y)가 되었고, (new x, new y)까지 박스의 영역이 늘어난만큼 더해줘야된다고 생각했지만, 꼭지점0 이 0,0으로 근접 할 수록 x와 y는 작아지므로 이에 대한 처리는 기존높이와 너비에 더하기(+)가 아닌 빼기(-)로 처리해줘야 합니다.

다른 예시로 꼭지점 2를 조정 할 때, 새로운 좌표 (new a, new b)로 꼭지점을 드래그해서 사이즈 조정을 하지만, 빨간색 박스의 새 좌표는 x축은 고정인 상태에서 y축 값만 바뀌므로, 이 부분만 업데이트를 해주고, 늘어난 영역에 대해서는 꼭지점 0과 마찬가지로 y축에 대해서는 0에 가까워지므로 기존높이에서 빼기(-)를 해주고, x축은 0에서 멀어지므로 기존너비에서 더하기(+)를 해주게 됩니다.

위와 같이 8개 꼭지점 마다 좌표와 영역의 연산 방식이 상이하므로, 이에 대한 처리를 다르게 해주었으며, 삼각형, 원, 이미지에 대해서도 각 특성에 맞는 설정을 해두었습니다.

<p align="center">
<img width="1160" alt="개체의 좌표와 크기 설정" src="https://github.com/team-dtrio/peach-pitch-client/assets/72593047/5900c3af-be64-41eb-870d-0fea2ad1fc9c">
</p>
<br />

### 1-3. 반대 방향의 꼭지점을 고정시켜 안정적인 크기 조절 기능 구현하기

<details>
<summary> Circle 크기 조절 코드 예시</summary>

```javascript
const onVertexDrag = useCallback(
  (draggedVertexIndex) => (event) => {
    event.preventDefault();
    event.stopPropagation();

    const initialPosition = { x: event.clientX, y: event.clientY };
    const initialSpec = { ...circleSpec };

    const moveHandler = throttle((moveEvent) => {
      const newPosition = {
        x: moveEvent.clientX,
        y: moveEvent.clientY,
      };

      let newCircleSpec = { ...circleSpec };
      const heightChange = newPosition.y - initialPosition.y;
      const widthChange = newPosition.x - initialPosition.x;

      switch (draggedVertexIndex) {
        case 0:
          newCircleSpec = {
            ...newCircleSpec,
            width: Math.max(10, initialSpec.width - widthChange),
            height: Math.max(10, initialSpec.height - heightChange),
            x: initialSpec.x + widthChange,
            y: initialSpec.y + heightChange,
          };
          break;
        case 1:
          newCircleSpec = {
            ...newCircleSpec,
            width: Math.max(10, initialSpec.width),
            height: Math.max(10, initialSpec.height - heightChange),
            y: initialSpec.y + heightChange,
          };
          break;
        case 2:
          newCircleSpec = {
            ...newCircleSpec,
            width: Math.max(10, initialSpec.width + widthChange),
            height: Math.max(10, initialSpec.height - heightChange),
            x: initialSpec.x,
            y: initialSpec.y + heightChange,
          };
          break;
        case 3:
          newCircleSpec = {
            ...newCircleSpec,
            width: Math.max(10, initialSpec.width + widthChange),
            height: Math.max(10, initialSpec.height),
            x: initialSpec.x,
          };
          break;
        case 4:
          newCircleSpec = {
            ...newCircleSpec,
            width: Math.max(10, initialSpec.width + widthChange),
            height: Math.max(10, initialSpec.height + heightChange),
            x: initialSpec.x,
            y: initialSpec.y,
          };
          break;
        case 5:
          newCircleSpec = {
            ...newCircleSpec,
            width: Math.max(10, initialSpec.width),
            height: Math.max(10, initialSpec.height + heightChange),
            y: initialSpec.y,
          };
          break;
        case 6:
          newCircleSpec = {
            ...newCircleSpec,
            width: Math.max(10, initialSpec.width - widthChange),
            height: Math.max(10, initialSpec.height + heightChange),
            x: initialSpec.x + widthChange,
          };
          break;
        case 7:
          newCircleSpec = {
            ...newCircleSpec,
            width: Math.max(10, initialSpec.width - widthChange),
            height: Math.max(10, initialSpec.height),
            x: initialSpec.x + widthChange,
          };
          break;
        default:
          break;
      }

      setCircleSpec(newCircleSpec);
    }, 200);

```

</details>
<br />
원을 리사이징 하는 꼭지점을 예시로 하여, 크기를 조절할 때 반대편 꼭지점을 고정하는 로직을 살펴보겠습니다.
<br />
<br />
각 case에 해당하는 꼭지점의 순서는 다음과 같습니다.
<br />
<img width="150" alt="image" src="https://github.com/team-dtrio/peach-pitch-client/assets/80331804/defcfe55-f66c-426f-af98-f6070f76b0d0">

예를 들어 `case 0`을 움직이는 경우, `case 4`에 해당하는 반대편 꼭지점은 움직이지 않고 리사이징 되어야 사용자 경험을 높일 수 있습니다.

이를 위해 `case 0`에서는 아래와 같이 구현했습니다.

```javascript
case 0:
  newCircleSpec = {
    ...newCircleSpec,
    width: Math.max(10, initialSpec.width - widthChange),
    height: Math.max(10, initialSpec.height - heightChange),
    x: initialSpec.x + widthChange,
    y: initialSpec.y + heightChange,
  };
```

앞서 구현했던 도형 개체의 width와 height 계산 공식과 함께 x와 y의 좌표를 설정한다면, 반대편 꼭지점이 고정된 듯한 효과를 줄 수 있습니다.

예를 들어, 꼭지점 0에서 4의 방향으로 이동하는 경우를 생각해보면, 시작점의 좌표인 좌측 상단 부가 움직이기 때문에 기존의 좌표에서 x축은 widthChange 만큼, y축은 heightChange 만큼 이동해주면 됩니다.

width와 height는 앞서 구현했던 것 만큼 원래의 너비에서 변화량 만큼을 빼주면 됩니다. 이렇게 좌표와 크기를 각 꼭지점에 맞게 구현함으로써 반대편이 고정된 듯한 효과를 얻을 수 있었습니다.

만약 case1, 3, 5, 7 과 같이 사각형 테두리의 모서리에 위치한 꼭지점의 경우에는 x 또는 y 좌표만 변화시킴으로써 반대편 모서리가 고정된 듯한 효과를 얻을 수 있습니다.

크기의 최소값은 10으로 설정해두어, 크기가 음수 값이 나오는 경우가 없게 하고, 다시 꼭지점을 선택 할 수 있을 만큼의 최소 크기를 지정해두어 사용자 경험을 높였습니다.

<br/>

## 2. 슬라이드 구현하기

### 2-1. ppt 슬라이드, 도형 개체를 순수 자바스크립트로 구현하기

프레젠테이션 어플리케이션을 구현할 때 div를 이용해서 ppt 슬라이드와 도형 개체를 구현하는 것이 또 하나의 큰 도전이 될 것 이라고 판단했습니다.

**1) ppt 슬라이드 자바스크립트로 구현하기**
<br />
ppt 슬라이드를 자바스크립트로 구현하기 위해서, 슬라이드의 상위 컴포넌트에서부터 캔버스의 spec과 렌더링 할 개체 배열 등 슬라이드 랜더링에 필요한 정보를 props로 받습니다.

<details>
<summary>상위 컴포넌트에서의 props</summary>

```javascript
<SlideCanvas
  canvasSpec={{
    width: 900,
    height: 600,
    scaleX: 1,
    scaleY: 1,
  }}
  objects={data}
  selectObject={selectObject}
  selectedObjectId={selectedObjectId}
  onObjectRightClick={handleRightClick}
/>
```

</details>

<details>
<summary>슬라이드 컴포넌트 코드</summary>

```javascript
function SlideCanvas({ canvasSpec, objects, onObjectRightClick }) {
  return (
    <Canvas spec={canvasSpec}>
      {objects.map(object => (
        <Object
          key={object._id}
          id={object._id}
          objectSpec={object}
          onRightClick={onObjectRightClick}
        />
      ))}
    </Canvas>
  );
}

const Canvas = styled.div`
  position: relative;
  width: ${({ spec }) => spec.width / spec.scaleX}px;
  height: ${({ spec }) => spec.height / spec.scaleY}px;
  transform: scaleX(${({ spec }) => spec.scaleX}) scaleY(
      ${({ spec }) => spec.scaleY}
    )
    translate(${({ spec }) => spec.translate});
  overflow: hidden;
  background-color: #fff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export default SlideCanvas;
```

</details>

1. Props 활용
   <br />
   Slide가 props로 받은 `canvasSpec`의 값을 통해 캔버스의 크기와 비율을 결정할 수 있습니다.
   `objects` prop은 캔버스에 렌더링할 도형 개체들의 배열입니다. 이 배열에는 각 객체의 ID, 위치, 크기, 타입 등의 정보가 포함되어 있어 슬라이드에 개체를 렌더링 하는데 사용됩니다.
   `onObjectRightClick`으로 슬라이드에서 오른쪽 클릭 이벤트를 처리할 수 있습니다.

2. Canvas 구성
   <br />
   캔버스는 스타일이 적용되어있는 div요소로써, position, width, height, transform 등의 속성을 사용해서 캔버스를 정의할 수 있습니다.

<br />

**2) 도형 개체 자바스크립트로 구현하기**
<br />
도형을 생성 할 때, 클라이언트에서 보낸 도형 개체 타입에 따라 기본 도형의 스펙에 맞게 DB에 저장하는 방식으로 구현했습니다.

<details>
<summary>기본 도형을 생성하는 서버 로직</summary>

```javascript
const defaultObjectProperties = {
  objectId: new mongoose.Types.ObjectId(),
  type,
  coordinates: { x: 100, y: 100 },
  dimensions: { height: 100, width: 100 },
  boundaryVertices: [
    { x: 0, y: 0 },
    { x: 50, y: 0 },
    { x: 100, y: 0 },
    { x: 100, y: 50 },
    { x: 100, y: 100 },
    { x: 50, y: 100 },
    { x: 0, y: 100 },
    { x: 0, y: 50 },
  ],
  animation: {},
};

switch (type) {
  case "Circle":
    defaultObjectProperties.Circle = {
      radius: 50,
      fillColor: "#d9d9d9",
      borderColor: "transparent",
    };
    break;
  case "Triangle":
    defaultObjectProperties.Triangle = {
      vertices: [
        { x: 50, y: 0 },
        { x: 0, y: 100 },
        { x: 100, y: 100 },
      ],
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      fillColor: "#d9d9d9",
      borderColor: "transparent",
    };
    break;
  case "Square":
    defaultObjectProperties.Square = {
      fillColor: "#d9d9d9",
      borderColor: "transparent",
    };
    break;
  case "Textbox":
    defaultObjectProperties.Textbox = {
      content: "New Textbox",
      fontSize: 14,
      textAlign: "left",
      fontFamily: "Arial",
      fontStyle: "normal",
      innerColor: "#d9d9d9",
      borderColor: "transparent",
    };
    break;
  case "Image":
    defaultObjectProperties.Image = {
      imageUrl,
      borderColor: "transparent",
    };
    break;
  default:
    return res
      .status(400)
      .json({ result: "error", message: "Invalid object type" });
}
```

</details>
<br />
이와 같이 도형 개체를 생성 할 때, 도형의 타입과 좌표, 크기, 색상, 테두리와 꼭지점을 포함해서 개체마다 각기 다른 속성들을 정의하고, 이 도형을 DB에 저장하는 형태로 구현했습니다.
<br/>
<br />
그리고 각각의 도형은 이렇게 정의된 기본 spec을 바탕으로 각각의 도형 개체들이 갖는 특성을 반영해서 div로 구현되었습니다.
아래는 삼각형을 div로 구현하는 코드의 예시입니다.
<br/>

```javascript
const StyledTriangle = styled.div`
  position: absolute;
  width: ${({ spec }) => spec.width}px;
  height: ${({ spec }) => spec.height}px;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  background-color: ${({ spec }) => spec.fillColor};
  border: 1px solid ${({ spec }) => spec.borderColor};
  top: ${({ spec }) => spec.y}px;
  left: ${({ spec }) => spec.x}px;
`;
```

<br/>

**3) 텍스트 박스 구현하기 : contenteditable에서 발생한 오류 해결하기**

도형 개체 중 텍스트 박스를 구현할 때 div의 contenteditable 속성에서 커서가 점프하는 오류과, 줄바꿈이 무효화 되는 오류가 있었습니다.

1.커서 점프 문제

contentEditable 요소에서 텍스트를 편집할 때, 커서가 예기치 않게 이동하는 것을 커서 점프라고 합니다. innerText 속성을 사용하면, DOM이 변경될 때마다 브라우저가 텍스트 노드를 다시 구성하고 렌더링합니다. 이 과정에서 커서 위치는 텍스트 내에서의 상대적 위치를 유지하게 됩니다. 이렇게 DOM 텍스트를 사용하는 방법으로 사용자가 입력하는 동안 커서가 예기치 않게 이동하는 문제를 해결할 수 있었습니다.

2.줄 바꿈 처리

HTML 내에서 줄 바꿈은 보통 `<br>` 태그 등으로 표현됩니다. innerText는 이러한 HTML 구조를 일반 텍스트로 변환할 때 자동으로 적절한 줄 바꿈 문자(예: \n)로 치환합니다. 이를 통해 contentEditable 요소 내의 텍스트가 프로그램적으로 처리될 때 줄 바꿈이 유지됩니다.

3.서버 데이터로 인해 contenteditable의 내용이 업데이트 될 때

서버로부터 가져온 데이터가 spec prop에 포함되어 EditableTextBox 컴포넌트로 전달되고, 이 데이터는 useEffect를 통해 컴포넌트의 로컬 상태로 설정됩니다.
innerText 속성을 사용해서 내용을 업데이트 하면, 레이아웃에 대한 계산을 다시 이루어지기 때문에 텍스트를 유지할 수 있게 됩니다. 이 과정을 통해서 innerText는 새로운 데이터를 효과적으로 통합하면서도 텍스트의 형식과 레이아웃을 유지할 수 있었습니다.

|        | innerText                                                                                         | innerHTML                                                                        |
| ------ | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| 내용   | 요소의 텍스트 내용만을 반환. HTML 태그를 제외한 순수 텍스트 정보가 필요한 경우 적합               | HTML 내용을 모두 포함하여 반환. HTML 태그를 포함한 전체 구조를 다루는 경우 적합  |
| 스타일 | 요소의 CSS 스타일을 고려하여 텍스트 처리                                                          | 요소의 스타일이나 레이아웃와 관계 없이 HTML 코드를 그대로 반환                   |
| 특징   | 페이지에 렌더링 된 그대로의 텍스트를 제공. 줄바꿈, 공백 등이 실제 브라우저에 표시되는 방식을 따름 | 요소의 내부 HTML 구조를 읽거나 수정 가능. 즉, DOM에 직접적인 변화를 줄 수 있음   |
| 보안   | HTML 태그나 스크립트를 텍스트로 취급하여, XSS(Cross-Site Scripting)공격 방지 가능                 | 사용자 입력을 그대로 innerHTML에 적용하는 경우 스크립트 주입으로 XSS 공격 가능성 |

innerText는 텍스트 내용만을 추출하고, HTML 태그는 무시합니다. 텍스트 박스에서의 텍스트 내용만을 필요로 하기 때문에 innerHTML에 비해 더 적합하다고 판단했습니다. 또한 XSS공격을 방지할 수 있어 보안 측면에서도 유리하여 innerText로 구현했습니다.

<br />

### 2-2. 슬라이드, 미리보기, 재생 모드 동기화하기

**1) 각 모드에서 도형 개체를 동일한 위치와 비율로 렌더링 하기**
ppt 슬라이드 모드, 슬라이드 미리보기 모드, 슬라이드 쇼 재생모드로 총 3가지의 모드에서 모두 도형 개체가 보여집니다. 이 들에서 모두 동일한 위치와 비율로 도형 개체가 렌더링 되어야합니다.
<br />

이를 위해서 DB에 저장된 개체들의 위치와 크기를 이용해서 각 개체의 상대적인 위치를 퍼센트를 기반으로 계산하여 구현했습니다.

```javascript
const BaseComponent = styled.div`
  position: absolute;
  left: ${({ spec }) => (spec.x / 900) * 100}%;
  top: ${({ spec }) => (spec.y / 600) * 100}%;
  width: ${({ spec }) => (spec.width / 900) * 100}%;
  height: ${({ spec }) => (spec.height / 600) * 100}%;
  background-color: ${({ spec }) =>
    spec.type.toLowerCase() === "textbox" ? "transparent" : spec.fillColor};
  border: 1px solid ${({ spec }) => spec.borderColor};
  text-align: ${({ spec }) => spec.textAlign};
  animation: ${({ spec }) => animations[spec.currentAnimation]} 2s linear;
  user-select: none;
  box-sizing: border-box;
  ${({ isActive }) =>
    isActive === undefined &&
    css`
      animation-duration: 0s;
    `}
  ${({ isActive }) =>
    isActive
      ? css`
          animation-play-state: running;
        `
      : css`
          animation-play-state: paused;
        `};
`;
```

- 상대적 위치 계산

  BaseComponent 스타일 컴포넌트에서 left와 top 속성이 (spec.x / 900)\*100%와 (spec.y / 600)\*100%로 계산되어있습니다. 도형의 x, y 좌표가 캔버스 크기에 상대적인 위치로 설정됩니다.

- 상대적 크기 계산

  BaseComponent에서 width와 height 속성이 (spec.width / 900)\*100%와 (spec.height / 600)\*100%로 계산되어 있습니다. 도형의 크기도 캔버스 크기에 상대적인 비율로 설정됩니다.

이렇게 각 도형 개체의 기본 컴포넌트를 설정하고, spec을 사용해서 도형의 위치와 크기를 비율(퍼센트)로 나누는 방식을 사용해서 ppt 슬라이드, 미리보기, 슬라이드 재생 컴포넌트에서 도형이 동일한 위치와 크기로 랜더링 될 수 있습니다. 절대적인 값이 아닌 비율로 표현하기 떄문에 세가지 다양한 화면 크기에서도 동일하고 일관된 비율로 보이게 할 수 있기 때문입니다.

**2) 각 모드에서 사용자의 제어 권한 다르게 하기**

이렇게 모든 개체가 각 모드에서 동일한 비율로 표현되도록 했습니다. 하지만 ppt 슬라이드 모드에서는 도형 개체가 편집, 이동이 가능해야 합니다. 반면에 미리보기 모드와 재생 모드에서는 편집이 불가능해야합니다.

이를 구현하기 위해서 미리보기와 재생모드에서는 편집 기능을 제한했습니다.
이 두가지 모드에서는 NonEditableObject라는 컴포넌트를 사용해 도형을 렌더링 하는데, 편집과 관련된 props(contentEditable, onContextMenu)을 받지 않거나 이런 props를 사용하여 편집기능을 활성화하지 않습니다.

그리고 사용자의 인터렉션 (클릭, 드래그 등)을 무시하는 방법으로 편집 기능을 제한합니다.

<details>
<summary>NonEditableObject 컴포넌트 코드</summary>

```
function NonEditableObject({ objectSpec, isAnimationActive, isThumbnail }) {
  const components = {
    Square,
    Triangle,
    Circle,
    Image,
  };
  const Tag = components[objectSpec.type] || "div";

  switch (objectSpec.type.toLowerCase()) {
    case "textbox":
      return (
        <BaseComponent spec={objectSpec} isActive={isAnimationActive}>
          <TextBox
            spec={objectSpec}
            isThumbnail={isThumbnail}
            contentEditable
            suppressContentEditableWarning
          >
            {objectSpec.content}
          </TextBox>
        </BaseComponent>
      );
    case "image":
      return (
        <BaseComponent spec={objectSpec} isActive={isAnimationActive}>
          <Image src={objectSpec.imageUrl} spec={objectSpec} alt="image" />
        </BaseComponent>
      );
    default:
      return <Tag spec={objectSpec} isActive={isAnimationActive} />;
  }
}

export default NonEditableObject;

```

</details>
미리보기 모드와 슬라이드 쇼 재생 모드일 때 편집이 불가능 하도록 사용자가 편집할 수 있는 기능을 비활성화 시켜둔 컴포넌트를 활용했습니다. 미리보기와 재생 모드의 역할을 수행할 수 있도록 isThumbnail로 미리보기 모드인지를 확인하고, isActive로 슬라이드 쇼 재생 여부를 확인합니다.

<br />
<br />

### 2-3. ppt 애니메이션을 순수 CSS(@keyframes)로 구현하기

**1) 애니메이션이란?**

애니메이션을 구현하기 위해서, 애니메이션이란 무엇이고 어떤 특성을 가지고 있는지 알아보았습니다.

> 애니메이션이란 정적인 이미지를 동적으로 만든 결과물입니다. 즉 프레젠테이션의 애니메이션은 `객체가 어떤 시간에 어떤 상태 인지를 정하는 것`입니다.

third party 라이브러리 없이, 애니메이션을 구현하기 위한 필수 속성인 객체의 `시간`과 `상태`를 동시에 표현할 수 있는 방법을 조사했습니다. **CSS 애니메이션과 @keyframes를 이용하면 프레임이 변함에 따라 CSS 속성이 어떤 값을 가질 지 정할 수 있다**는 것을 알게 되어, 이를 적용해 애니메이션을 구현했습니다.

<br/>

**2) 애니메이션에 생동감을 더하는 Cubic-bezier 곡선**

keyframes를 활용했지만, 역동감과 생동감이 부족하다는 생각이 들었습니다. CSS 애니메이션의 경로와 속도를 조절하기 위해 CSS에 내재된 Cubic-bezier 함수를 활용했습니다. Cubic-bezier 함수는 4개의 매개변수 (x1, y1, x2, y2)를 사용해서 속도 곡선을 정의합니다. 즉, 시간과 애니메이션 진행 상태와의 관계를 정의합니다. 이를 통해 애니메이션의 속도를 상세하게 조정할 수 있었습니다.

<img width="600" alt="cubic-bezier" src="https://github.com/team-dtrio/peach-pitch-client/assets/72593047/c25fdb71-57e1-4061-85a3-47a734707aed">
<br />
이 그림에서의 상단에서 보듯이, 4가지의 매개변수를 이용하면 보다 상세한 속도 조절이 가능합니다.

<br />
아래는 선형적인 애니메이션과 cubic-bazier를 이용한 애니메이션의 예시입니다.

| ![cubic-bazier](https://github.com/team-dtrio/peach-pitch-client/assets/80331804/18e7ace3-f961-4d78-9cec-970851efe66a) | ![anmation with cubic-bazier](https://github.com/team-dtrio/peach-pitch-client/assets/80331804/ad71c067-99d0-4326-b0ef-7f1de7860c9e) |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |

<br />
[왼쪽 애니메이션]

- 위쪽의 하늘색 사각형으로 표현된 애니메이션은, 기존 애니메이션의 구현을 보여주는 예시입니다.
  <br />`기본 선형 애니메이션`의 예시로서, 비교적 단순한 움직임을 보였습니다.
  비교적 단순한 기본 애니메이션을 사용하지 않고 cubic-bazier 함수를 이용해서 상세한 애니메이션의 적용이 가능하다고 생각했습니다.
  <br />
- 왼쪽의 아래에 위치한 애니메이션은, `cubic-bazier함수`를 이용해서 상세하게 속도를 변화시킨 애니메이션의 예시입니다. 처음과 끝의 속도를 조절하는 것 만으로도 생동감이 부여됩니다.

<br/>
[오른쪽 에니메이션]

- 오른쪽 애니메이션은 cubic-bazier 함수를 이용해 프로젝트에서 block-wipe 애니메이션을 구현한 예시입니다. 시작과 끝의 속도가 중간 지점의 속도보다 느리게 이동하며, 보다 생동감있고 역동적이게 애니메이션을 표현할 수 있었습니다.

<br />

## 3. 드래그 앤 드롭을 이용한 ppt 슬라이드 순서 변경 기능 구현

<img width="650" alt="image" src="https://github.com/NayeongK/objecthorizon-client/assets/80331804/42deb877-1d18-440e-8691-2db6ca7d0bd2">

<br />
HTML5의 Drag and Drop API를 이용해서, 사용자의 드래그 앤 드롭 인터렉션을 이용한 슬라이드 순서 변경 기능을 구현했습니다.
<br />
<br />

1. **사용자의 드래그**
   <br />
   사용자가 드래그를 시작할 때, 드래그된 슬라이드의 id를 `event.dataTransfer.setData`를 사용해서 저장합니다. 이를 이용해서 드래그 이벤트 중에 슬라이드의 id를 전달할 수 있습니다.

2. **사용자의 드래그 종료**
   <br />
   사용자가 드래그를 끝내고 슬라이드를 놓습니다. 이때 `event.dataTransfer.getData`를 사용하여 드래그가 시작된 슬라이드의 id(droppedSlideId)를 가져옵니다. 그리고 슬라이드가 놓여진 위치에 있는 타겟 슬라이드의 id(targetSlideId)도 같이 사용됩니다.

3. **슬라이드 배열 순서 변경**
   <br />
   `현재 슬라이드 배열`, 드래그된 슬라이드 id(`droppedSlideId`), 타겟 슬라이드 id(`targetSlideId`)로 변경된 순서의 슬라이드 배열을 생성합니다.
   드래그된 슬라이드를 제거하고, 타겟 슬라이드 위치에 삽입하여 순서를 변경합니다.

4. **서버에 순서 변경 요청**
   <br />
   새로운 슬라이드 순서로 변경이 되면, useUpdateSlideOrderMutation 훅을 사용하여 변경된 순서를 서버에 비동기적으로 업데이트 요청합니다. 서버에서는 변경된 슬라이드의 순서로 db에 변경된 순서로 슬라이드를 저장하고 클라이언트에 응답을 보냅니다. 이 요청이 성공하면, `queryClient.invalidateQueries`를 호출하여 쿼리를 무효화시킵니다.

5. **리렌더링**
   <br />
   React-Query의 refetch로 인해 컴포넌트가 자동적으로 리랜더링 됩니다.
   서버에 업데이트 요청이 완료되면, queryClient.invalidateQueries에 의해 slides 관련 쿼리가 무효화됩니다. 이는 useQuery 훅이 관리하는 slides 데이터에 변화가 생겼음을 알리며, React Query는 자동으로 이 데이터를 다시 가져옵니다 (`refetch`).
   새로운 데이터가 도착하면, 이는 컴포넌트에 반영되어 변경된 슬라이드 순서로 화면이 자동으로 리렌더링 됩니다.

<details>
<summary>해당 코드</summary>

```javascript
function updateSlideOrder(currentSlides, droppedSlideId, targetSlideId) {
  const droppedIndex = currentSlides.findIndex(
    slide => slide._id === droppedSlideId,
  );
  const targetIndex = currentSlides.findIndex(
    slide => slide._id === targetSlideId,
  );

  const newSlides = [...currentSlides];
  const [removed] = newSlides.splice(droppedIndex, 1);
  newSlides.splice(targetIndex, 0, removed);

  return newSlides;
}

function handleDragStart(event, id) {
  event.dataTransfer.setData("text/plain", id);
}

function handleDragOver(event) {
  event.preventDefault();
}

async function handleDrop(event, id) {
  event.preventDefault();

  const droppedSlideId = event.dataTransfer.getData("text/plain");
  const targetSlideId = id;

  const newSlides = updateSlideOrder(
    slidesState,
    droppedSlideId,
    targetSlideId,
  );

  const newOrder = newSlides.map(slide => slide._id);

  await useUpdateSlideOrderMutation.mutateAsync({ newOrder });
}
```

<br />
</details>

<br />

## 4. 프레젠테이션 앱에 적합한 DB 구조는?

프레젠테이션 앱을 구성하고 있는 가장 기본적인 형태는 프레젠테이션, 슬라이드, 그리고 슬라이드 속의 객체들, 그리고 객체들이 갖게 될 개별적인 애니메이션 효과들입니다. 위의 모든 요소들이 DB에 저장되어야하고, 기존에 이용되고 있는 프레젠테이션 어플리케이션와 같이 계층적 구조를 가져야 한다고 판단했습니다.

<img width="572" alt="계층적 구조 슬라이드" src="https://github.com/team-dtrio/peach-pitch-client/assets/80331804/1c1181e5-c61b-4479-b571-9caf6f3f12ad">

<br />

즉, '프레젠테이션 - 슬라이드 - 개체 - 애니메이션'에서 '프레젠테이션'은 가장 상위 항목에 해당하며, 각 프레젠테이션은 여러 슬라이드를 포함하고, 각 슬라이드는 여러 개체를 포함하고, 그리고 각 개체는 여러 애니메이션을 포함할 수 있습니다. 이를 표현하기 위해서는 Embedded Document(비정규화된 데이터)의 형식이 가장 적합하다고 생각했습니다.

**Embedded Document**
| | Embedded Document의 장점과 단점 |
| ------- | --- |
| 장점1 | 한번의 쿼리로 모든 정보를 불러올 수 있습니다.|
| 장점2 | 데이터 계층 별로 종속적인 관계를 가지고 있으므로, 다른 데이터에 의존하지 않습니다. |
| 단점1 | MongoDB에서 1개의 document마다 16MB의 용량 제한이 있습니다. |
| 단점2 | 모든 내용을 다 업데이트 하기 때문에 퍼포먼스의 이슈가 발생할 수 있습니다. |

MongoDB의 document당 16MB 용량제한과 관련해서는, 이미지는 amazon S3에 별도로 저장하고 있다는 점에서 크게 문제가 없을 것으로 판단하였으나, 내부적으로 한 프레젠테이션에 이용 될 수 있는 용량을 미리 계산 해봤습니다.

<details>
<summary>개체의 용량 계산 과정</summary>

텍스트박스 개체:

- 텍스트 문자열 (평균 100자): ~200byte (UTF-8 인코딩에서 문자당 2byte)
- FontSize, textAlign, fontFamily, fontStyle, innerColor, borderColor: 각각 ~7 byte (Number 및 짧은 String 타입) - 총 42 byte

도형 개체 (원, 직사각형, 삼각형):

- fillColor, borderColor: 각각 ~7 byte - 총 14 byte
- 원의 경우, 반지름을 위한 추가 필드: ~7 byte
- 직사각형의 경우, 높이와 너비를 위한 두 개의 추가 필드: ~14 byte
- 삼각형의 경우, 3개의 꼭짓점 좌표: ~42 byte

이미지 개체:

- imageUrl: 평균 URL 길이가 100자라고 가정 - ~200 byte
- borderColor: ~7 byte

그러므로, 각 슬라이드당 10개의 텍스트박스와 1개의 이미지 개체가 있고, 모든 개체들에는 애니메이션 효과가 없다고 가정할 때

- 텍스트박스: 10 \* (200 + 42) = 2420 byte
- 이미지: 1 \* (200 + 7) = 207 byte

</details>
<br />
한 슬라이드당 2627 byte 정도를 이용하게 됩니다. 퍼포먼스적인 이슈를 제외하고 물리적인 저장용량만 봤을 때, 이 프로젝트에서 Embedded Document의 단점인 MongoDB의 16MB 용량제한은 문제가 되지 않을 것이라고 생각했습니다.

<br />
아래는 실제 프로젝트에 사용된 데이터베이스 구조입니다.

![스크린샷 2023-08-02 오후 1 14 58](https://github.com/team-dtrio/peach-pitch-client/assets/72593047/0a4252b0-bf7c-44d3-81d7-0c2731a5e6e9)

임베디드 방식을 이용해서, 계층적인 관계를 가지고 있게 되었고, 각각의 데이터구조를 불러오기, 만들기, 삭제하기 적합한 데이터베이스 구조를 갖게 되었습니다.

<br />

## 5. 서버와 클라이언트의 상태관리: React Query와 Context API의 결합

### 5-1. React Query를 이용한 자동저장 구현하기 : 개체의 상태와 DB를 동시에 관리하기

**1) React query 의 활용**
<br/>
이 프로젝트의 핵심적인 기능 중 하나는 서버 데이터와 클라이언트 상태를 실시간으로 동기화하는 것입니다. 프레젠테이션, 슬라이드, 개체, 애니메이션이 추가, 수정, 삭제될 때마다 DB도 업데이트 되고 자동저장 되어야 하는 구조가 필요합니다.

초기에는 Redux를 사용하여 전역 상태를 관리하고 fetch로 서버와 통신하는 방식을 고려했습니다. 하지만, 이 방법은 프레젠테이션 애플리케이션의 자동저장이 빈번한 특성을 고려할 때, 비동기 작업으로 인해 Redux store가 비대해질 가능성이 있었습니다.

따라서, 서버와 빈번한 통신이 필요한 경우 Server Side State를 효과적으로 관리하는 것이 중요하다고 판단하여 `React Query`를 사용하기로 결정했습니다.

<br />

**2) React Query의 장점**
<br/>
React Query는 아래와 같은 장점이 있습니다.

| 장점                          | 설명                                                                                                                                                                                               |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 서버 상태 관리                | React Query는 서버 상태(데이터)를 캐시하여 관리합니다. <br />이를 통해 불필요한 네트워크 요청을 줄이고, 반응성을 향상시킵니다.                                                                     |
| 자동 데이터 동기화            | 데이터가 변경될 때 `invalidateQueries` 메소드를 통해 쿼리를 무효화하고 자동으로 재요청(refetch)합니다.<br />이 장점으로 인해 데이터가 항상 최신 상태로 유지될 수 있고, 자동으로 화면에 반영됩니다. |
| 에러 핸들링 및 로딩 상태 관리 | React Query는 데이터 로딩 및 에러 핸들링을 쉽게 관리할 수 있는 인터페이스가 있어, <br />에러 핸들링과 로딩 상태를 다루기 편리합니다.                                                               |

<br/>

**3) 자동저장 로직의 구현**
<br/>
React Query를 사용하여 자동저장 로직을 구현하는 과정은 아래의 순서와 같습니다.

- 사용자가 프레젠테이션, 슬라이드, 개체 등을 수정할 때, 해당 변경 사항은 즉시 mutation 훅을 통해 서버에 전송됩니다.

- 수정이 성공적으로 서버에 반영되면, onSuccess 콜백에서 invalidateQueries를 호출하여 관련 쿼리를 무효화시킵니다.

- React Query는 변경된 데이터에 대해 자동으로 새로운 요청을 보내고, 이 데이터는 클라이언트의 UI에 반영됩니다.

이러한 방식으로 React Query를 활용하면, 서버와 클라이언트 간의 데이터 동기화를 효율적으로 관리할 수 있으며, 사용자 경험을 개선하면서 자동저장 기능을 효과적으로 구현할 수 있습니다.

<br />

### 5-2. Context API의 활용

위와 같이 react query를 이용하여 각 개체들의 상태와 서버데이터를 동기화 할 수 있었으나, 클라이언트측에서 별도로 상태를 관리해야 할 필요성이 생겨서 Context API를 이용하였습니다.

```javascript
function ObjectProvider({ children }) {
  const [selectedObjectId, setSelectedObjectId] = useState(null);
  const [selectedObjectType, setSelectedObjectType] = useState(null);

  const selectObject = useCallback(
    (id, type) => {
      if (selectedObjectId === id && selectedObjectType === type) {
        setSelectedObjectId(null);
        setSelectedObjectType(null);
      } else {
        setSelectedObjectId(id);
        setSelectedObjectType(type);
      }
    },
    [selectedObjectId, selectedObjectType],
  );

  const deselectObject = useCallback(() => {
    setSelectedObjectId(null);
    setSelectedObjectType(null);
  }, []);

  const value = useMemo(
    () => ({
      selectedObjectId,
      selectedObjectType,
      selectObject,
      deselectObject,
    }),
    [selectedObjectId, selectedObjectType, selectObject, deselectObject],
  );
}
```

useCallback 사용
<br />
selectObject와 deselectObject 함수를 useCallback 훅을 사용하여 메모이제이션했습니다. 의존성 배열의 값이 변경될 때만 이 함수가 재생성되도록하여, 불필요한 리렌더링을 방지했습니다.

useMemo 사용
<br />
Context의 value는 useMemo를 사용하여 메모이제이션되어, 의존성 배열 내의 값이 변경되지 않을 시 동일한 객체를 참조하도록 했습니다. 컴포넌트들이 불필요하게 리렌더링되는 것을 방지할 수 있었습니다.

<br />

# **Project Timeline**

<details>
<summary>프로젝트 기간 : 2023.07.10 ~ 2023.08.04 (총 25일, 기획 및 설계 10일, 개발 및 마무리 15일)</summary>
<br />

**기획 및 설계 (10일)**

- 아이디어 수집
- Figma를 사용한 Mockup 제작
- 기술 스택 선정
- Git 작업 플로우 및 코드 컨벤션, 커밋 룰 등 팀 협업 규칙 정립
- MongoDB Schema 설계

**기능 개발 및 테스트코드 작성 (15일)**

- 클라이언트 기능 구현
- 백엔드 서버 구현
- 테스트 코드
- 팀 프로젝트 발표 준비 및 발표
- 리드미 작성
- 배포
</details>

<br />

# Contribution

**클라이언트 (컴포넌트별)**

- 기본 설정 및 환경변수 설정 : 곽나영
- 로그인 화면 및 기능 (Login) : 문형석
- 메인페이지 화면 및 기능 (Main) : 문형석, 곽나영 공동작업
- 프레젠테이션 편집기능 (Presentation)
  - 슬라이드 장표 (SlideCanvasLayout) : 문형석
  - 개체 정의 (Object) : 김정우
  - 개체 삽입 (ObjectCreator) : 김정우, 문형석 공동작업
  - 개체 수정 (ObjectEditor)
    - 색 및 폰트 (StyleEditor - ColorEditor, TextEditor) : 김정우
    - z-index (StyleEditor - ArrangeEditor) : 곽나영
    - 개체의 좌표 및 사이즈 조정 (Object) : 곽나영
  - 애니메이션 효과추가 및 수정(AnimationEditor) : 곽나영
  - 슬라이드 네비게이터(SlideNavigator) : 곽나영
  - 슬라이드 쇼 모드(ScreenShowLayout)와 애니메이션 효과 (Styles) : 문형석
  - 스타일 설정 (Styles) : 문형석
- 각 컴포넌트의 에러처리 : 곽나영

**서버**

- 로그인 및 토큰 인증 : 곽나영
- 애니메이션 추가,수정,삭제 : 곽나영
- 개체, 슬라이드, 프레젠테이션 추가,수정,삭제 : 김정우
- DB Schema : 김정우, 문형석, 곽나영 공동작업

<br />

# **Tech Stack**

**Client**:
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
<img src="https://img.shields.io/badge/ReactQuery-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white">

**Server**:
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white">
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
<img src="https://img.shields.io/badge/AmazonS3-569A31?style=for-the-badge&logo=AmazonS3&logoColor=white">

**Test**:
<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=Jest&logoColor=white">
<img src="https://img.shields.io/badge/React Testing Library-E33332?style=for-the-badge&logo=TestingLibrary&logoColor=white">
<img src="https://img.shields.io/badge/Supertest-569A31?style=for-the-badge&logo=&logoColor=white">

**Deployment**:
<img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=Netlify&logoColor=white">
<img src="https://img.shields.io/badge/AWS Elastic Beanstalk-FF9900?style=for-the-badge&logo=&logoColor=white">

<br/>

# **Our Team**

- 문형석 : [hyn9xc@gmail.com](mailto:hyn9xc@gmail.com)
- 곽나영 : [nayeongKwak.dev@gmail.com](mailto:nayeongKwak.dev@gmail.com)
- 김정우 : [kjw5757@gmail.com](mailto:kjw5757@gmail.com)
