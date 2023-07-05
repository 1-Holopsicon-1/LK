import{u as r,y as x,p,m as d,s as i,j as e,r as F,bk as b,a2 as D}from"./vendor-9cc634b6.js";import{$ as v,bB as S,S as m,z as $,ab as T,T as k,ay as L,a8 as u,M,aa as R,bl as _,f as P,bm as z}from"./index-3fee83b2.js";const O=async a=>{const t=new FormData;return t.set("avatar",a[0]),await v.post("?changeAvatar=1",t,{headers:{"Content-Type":"multipart/form-data"}})},B=async a=>{const t=new FormData;return t.set("email",a),await v.post("?changeEmail=1",t)},g={loading:!1,completed:!1,error:null},I={data:[],...g},U={data:"",...g},V={data:"",...g},w=r(),j=r(),n=x(async a=>{try{await O(a)}catch{throw new Error("Не удалось загрузить фотографию")}}),W=p(I).on(w,(a,t)=>({...a,data:t})).on(n,a=>({...a,error:null,loading:!0,completed:!1})).on(n.doneData,a=>({...a,error:null,loading:!1,completed:!0})).on(n.fail,(a,{error:t})=>({...a,error:t.message,loading:!1,completed:!1})).on(j,(a,t)=>({...a,completed:t})),A=r(),s=x(async a=>{try{await B(a)}catch{throw new Error("Не удалось изменить email")}}),N=p(V).on(A,(a,t)=>({...a,data:t})).on(s,a=>({...a,loading:!0})).on(s.doneData,a=>({...a,loading:!1,completed:!0,error:null})).on(s.failData,(a,t)=>({...a,loading:!1,completed:!1,error:t.message})),q=r(),G=p(U).on(q,(a,t)=>({...a,data:t})),H=()=>({avatar:d(W),adPass:d(G),email:d(N)}),E={useData:H},o={avatar:{changeAvatar:w,changeCompleted:j},email:{changeEmail:A}},J={avatar:{postAvatarFx:n},email:{postNewEmail:s}},K=i.div`
    min-width: 500px;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
`,Q=()=>{const{avatar:{data:a,loading:t,completed:l}}=E.useData(),c=()=>{J.avatar.postAvatarFx(a)};return e.jsxs(K,{children:[e.jsx(S,{files:a,setFiles:o.avatar.changeAvatar,isActive:!0,maxFiles:1,formats:["image/jpeg","image/jpg"]}),e.jsx(m,{text:"Изменить фотографию",isLoading:t,completed:l,action:c,isActive:a.length===1,popUpFailureMessage:"Фотография не загружена",setCompleted:o.avatar.changeCompleted})]})},X=i.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 16px;
`,Y=i.div`
    position: relative;
    width: fit-content;
    height: fit-content;
    border-radius: 100%;
    overflow: hidden;
    cursor: pointer;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #00000056;
        z-index: 1;
    }

    svg {
        position: absolute;
        width: 45px;
        height: 45px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        color: #fff;
    }
`,f=i.div`
    display: flex;
    align-items: center;
    column-gap: 8px;
`,ta=()=>{const{data:{user:a}}=$.useUser(),t=z.logout,{open:l}=T(),{email:{data:c},adPass:{data:h}}=E.useData(),y=h.length<7?"Длина пароля должна быть больше 7":void 0;if(!a)return null;F.useEffect(()=>{o.email.changeEmail("takeonfaith6@gmail.com")},[]);const C=()=>{l(e.jsx(Q,{}))};return e.jsxs(X,{children:[e.jsx(k,{size:1,align:"left",children:"Аккаунт"}),e.jsxs(Y,{onClick:C,children:[e.jsx(b,{}),e.jsx(L,{name:a==null?void 0:a.fullName,avatar:a==null?void 0:a.avatar,marginRight:"0"})]}),e.jsxs(f,{children:[e.jsx(u,{width:"300px",placeholder:"email",value:c,setValue:o.email.changeEmail}),e.jsx(m,{height:"36px",width:"200px",text:"Изменить почту",isLoading:!1,completed:!1,action:function(){throw new Error("Function not implemented.")},setCompleted:function(){throw new Error("Function not implemented.")}})]}),e.jsxs(M,{type:"info",title:"Требования к новому паролю",maxWidth:"508px",children:["1. Минимальная длина пароля 7 знаков;",e.jsx("br",{}),"2. Пароль не должен содержать имени учетной записи пользователя или частей полного имени пользователя длиной более двух рядом стоящих знаков;",e.jsx("br",{}),"3. Допустимые символы: латинские заглавные и строчные буквы, цифры, отличающиеся от букв и цифр знаки (например, !, $, #, %)."]}),e.jsxs(f,{children:[e.jsx(u,{width:"300px",placeholder:"Пароль",value:h,alertMessage:y,type:"password",setValue:o.email.changeEmail}),e.jsx(m,{height:"36px",width:"200px",text:"Изменить пароль",isLoading:!1,completed:!1,action:function(){throw new Error("Function not implemented.")},setCompleted:function(){throw new Error("Function not implemented.")}})]}),e.jsx(R,{icon:e.jsx(D,{}),onClick:()=>_.evokeConfirm({message:"Вы точно хотите выйти из аккаунта?",onConfirm:t}),background:"transparent",textColor:P.red.main,text:"Выйти из аккаунта"})]})};export{ta as default};
