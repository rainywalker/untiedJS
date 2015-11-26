## untiedJS

현재 주류 라이브러리들은 생성된 DOM객체에 조작을 가하는 방식으로 작동함.
하지만 이 경우 잦은 html의 변화에 대응할 수 없으며 원하는 DOM이 생성된 것을 대기하거나 확인한 후에나 객체로서 조작할 수 있게 됨.
이러한 의존성은 해당 DOM 내부에 다른 DOM을 로딩하여 조작하는 경우 연쇄적으로 복잡성이 더해짐.

utiedJS(풀린JS^^)는 다음의 방법을 통해 DOM객체가 정적이라는 가정을 하지 않고 언제나 실행시점에 계산하여 판단하는 방식으로 작동함.

* 이벤트의 경우 body수준에서 위임을 통해 작동하는 것을 기본으로 함
    1. 순수한 JS객체구조로 원하는 작동을 기술하고 실제 바인딩될 DOM을 지정하지 않음.
    2. 대신 DOM객체에는 태그상에 data-*를 통해 JS객체와의 연결 힌트를 제공함.
* 리스너 안에서 본인이 아닌 다른 DOM을 얻기 위해 정적 HTML구조에 의존하는 기존의 쿼리계열을 통한 절대위치 질의를 원천적으로 채용하지 않고 본인과 본인이 속한 그룹으로부터 찾는 상대쿼리만 지원함.

## 기본적인 아이디어

```html
<div data-touchstart='a'>test</div>
```
위와 같은 html조각에서 div태그에 기술된 data-touchstart는 a라는 값으로 자신의 동작이 어떤 js객체로 수행되면 좋을지에 대한 힌트를 제공함.

```javascript
var data = {a:function(e){console.log('test touched!');}};
```
개념상 순수한 js는 DOM과 전혀 객체로 바인딩 되어있지 않으므로 어떤 DOM과도 연결될 수 있으며 해당 DOM이 새로 설정되어도 상관없음

```javascript
document.body.onclick = function(e){
    var target = e.target,
        type = e.type,
        key = target.getAttribute('data-' + type);
    if(data[key]) data[key].call(e.target, e);
};
```
이벤트는 전역에서 발생시 계산에 의해 바인딩 되는 구조로 작동함.
untiedJS내부에서는 이 과정을 고도화함.

* 버블링단계를 수동으로 구현함.
* 일정 수준이상 버블링을 찾지 않는 가드기능을 제공함.

