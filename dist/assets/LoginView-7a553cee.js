import{_ as y,u,a as i,k,r as e,o as S,c as U,w as s,b as t,d as z,e as C,f as I,v as T}from"./index-875d86c2.js";const j={setup(){return{store:u()}},data(){return{user:"",password:"",loading:!1,isValid:null}},methods:{async submit(){await this.checkCredentials()},async checkCredentials(){localStorage.clear(),this.loading=!0,i.post(`${k}/api/v1/jwt/create/`,{username:this.user,password:this.password}).then(n=>{const o=u(),r=n.data.access;o.setAccessToken(r),localStorage.setItem("access",r);const l=n.data.refresh;o.setRefreshToken(l),localStorage.setItem("refresh",l),i.defaults.headers.common.Authorization="JWT "+r,this.isValid=!0,this.$router.push("/practice")}).catch(n=>{console.log("incorrect credentials",n),i.defaults.headers.common.Authorization="",this.isValid=!1}).finally(()=>this.loading=!1)}}};function A(n,o,r,l,a,_){const m=e("v-icon"),d=e("v-text-field"),p=e("v-alert"),v=e("v-card-text"),f=e("v-btn"),h=e("v-card-actions"),w=e("v-form"),g=e("v-sheet"),x=e("v-card"),b=e("v-row"),V=e("v-container");return S(),U(V,null,{default:s(()=>[t(b,{align:"center",justify:"center"},{default:s(()=>[t(x,{width:"400",variant:"outlined"},{prepend:s(()=>[t(m,{icon:"mdi-account-circle",size:"x-large"})]),title:s(()=>[z(" User login ")]),default:s(()=>[t(g,null,{default:s(()=>[t(w,{"validate-on":"submit lazy",onSubmit:C(_.submit,["prevent"]),"model-value":a.isValid},{default:s(()=>[t(v,null,{default:s(()=>[t(d,{label:"Username",modelValue:a.user,"onUpdate:modelValue":o[0]||(o[0]=c=>a.user=c),variant:"outlined",class:"ma-2"},null,8,["modelValue"]),t(d,{label:"Password",modelValue:a.password,"onUpdate:modelValue":o[1]||(o[1]=c=>a.password=c),type:"password",variant:"outlined",class:"ma-2"},null,8,["modelValue"]),I(t(p,{"border-color":"red",text:"Incorrect username or password",border:"start",class:"text-subtitle-1"},null,512),[[T,a.isValid===!1]])]),_:1}),t(h,{class:"align-center justify-center"},{default:s(()=>[t(f,{loading:a.loading,text:"submit",rounded:"lg",size:"large",class:"text-uppercase",type:"submit",variant:"elevated"},null,8,["loading"])]),_:1})]),_:1},8,["onSubmit","model-value"])]),_:1})]),_:1})]),_:1})]),_:1})}const L=y(j,[["render",A],["__scopeId","data-v-e76ff758"]]);export{L as default};
