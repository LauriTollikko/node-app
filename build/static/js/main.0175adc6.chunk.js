(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,t,n){e.exports=n(43)},41:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var a=n(11),i=n.n(a),o=n(0),r=n.n(o),u=n(12),l=n(13),s=n(15),c=n(14),m=n(16),f=n(2),h=function(e){return r.a.createElement("div",null,r.a.createElement("h2",null,"Numerot"),e.this.state.persons.map(function(t){return r.a.createElement("div",{key:t.id},r.a.createElement("p",null,t.name," ",t.number,r.a.createElement("button",{onClick:e.this.removePerson(t.id)},"poista")))}))},d=function(e){return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:e.this.addPerson},r.a.createElement("div",null,"nimi: ",r.a.createElement("input",{value:e.this.state.newName,onChange:e.this.handleNameChange})),r.a.createElement("div",null,"numero: ",r.a.createElement("input",{value:e.this.state.newNumber,onChange:e.this.handleNumberChange})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"lis\xe4\xe4"))))},p=n(3),v=n.n(p),b={getAll:function(){return v.a.get("/api/persons")},create:function(e){return v.a.post("/api/persons",e)},remove:function(e){return v.a.delete("".concat("/api/persons","/").concat(e))}},E=function(e){var t=e.message;return null===t?null:r.a.createElement("div",{className:"notification"},t)},N=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(s.a)(this,Object(c.a)(t).call(this,e))).isNameIncluded=function(){var e=!1;return n.state.persons.forEach(function(t){t.name===this.state.newName&&(e=!0)},Object(f.a)(Object(f.a)(n))),e},n.addPerson=function(e){if(e.preventDefault(),!0===n.isNameIncluded())alert("Nimi on jo luettelossa!");else{var t={name:n.state.newName,number:n.state.newNumber};b.create(t).then(function(e){n.setState({persons:n.state.persons.concat(e.data),newName:"",newNumber:""})}),n.setState({notificationText:"Lis\xe4ttiin ".concat(t.name," luetteloon")}),setTimeout(function(){n.setState({notificationText:null})},4e3)}},n.removePerson=function(e){return function(){b.remove(e).then(function(e){n.componentDidMount()}),n.setState({notificationText:"Poisto onnistui!"}),setTimeout(function(){n.setState({notificationText:null})},4e3)}},n.handleNameChange=function(e){n.setState({newName:e.target.value})},n.handleNumberChange=function(e){n.setState({newNumber:e.target.value})},n.state={persons:[],newName:"",newNumber:"",notificationText:null},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;b.getAll().then(function(t){e.setState({persons:t.data})})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h2",null,"Puhelinluettelo"),r.a.createElement(E,{message:this.state.notificationText}),r.a.createElement(d,{this:this}),r.a.createElement(h,{this:this}))}}]),t}(r.a.Component);n(41);i.a.render(r.a.createElement(N,null),document.getElementById("root"))}},[[17,2,1]]]);
//# sourceMappingURL=main.0175adc6.chunk.js.map