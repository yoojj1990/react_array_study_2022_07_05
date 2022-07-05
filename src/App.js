import { useRef, useState } from "react";

import './App.css';



function User({user}) {
  return (
    <div>
      <h1>이름 : {user.username}</h1>
      <h1>이메일 : {user.email}</h1>
    </div>
  );
}

function CreateUser({username, email, onChange, onCreate}) {
  return (
    <div>
      이름 : <input name="username" onChange={onChange} value={username}></input><br></br>
      이메일 : <input name="email" onChange={onChange} value={email}></input>
      <button onClick={onCreate}>등록</button>
    </div>
  );
}

function UserList({users}) {
  // const users = [
  //   {id: 1, username:"홍길동", email:"hong@abc.com"}
  //   {id: 2, username:"이순신", email:"lee@abc.com"}
  // ]
  return (
    <div>
      {users.map(user => (
        <User user={user} key={user.id}></User>
      ))}
    </div>
  );
}

function App() {
  const [inputs, setInputs] = useState({
    username:"",
    email:""
  });
  const {username, email} = inputs;

  const onChange = (e) => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]:value
    });
  };

  const [users, setUsers] = useState([
    {id:1, username:"홍길동", email:"hong@abc.com"},
    {id:2, username:"이순신", email:"lee@abc.com"}
  ]);

  const nextId = useRef(3);
  const onCreate = () => {
    const user = {
      id : nextId.current,
      username,
      email
    };
    setUsers([...users, user]);

    setInputs({
      username:"",
      email:""
    });
    nextId.current += 1;
  };


  return (
    <div className="App">
      <CreateUser 
      username={username}
      email={email}
      onCreate={onCreate}
      onChange={onChange}
      ></CreateUser>
      <UserList users={users} />
    </div>
  );
}

export default App;
