import { useRef, useState } from 'react';
import './App.css';

function User({user, onRemove, onToggle}) {
  return(
    <div>
      <h1>이름 :         
        <b
          style={{
            cursor: "pointer",
            color:user.active ? "red":"blue"
          }}
          onClick={()=> onToggle(user.id)}
        >
        {user.username}
        </b>
      </h1>
      <h1>이메일 : {user.email}</h1>
      <button onClick={()=>onRemove(user.id)}>삭제</button>
    </div>
  );
}

function CreateUser({username, email, onChange, onCreate}) {
  return(
    <div>
      이름 : <input name='username' onChange={onChange} value={username}></input><br></br>
      이메일 : <input name='email' onChange={onChange} value={email}></input>
      <button onClick={onCreate}>등록</button>
    </div>
  );
}

function UserList({users, onRemove, onToggle}) {
  // const users = [
  //   {id:1, username:"홍길동", email:"hong@abc.com"},
  //   {id:2, username:"이순신", email:"lee@abc.com"}
  // ]

  return(
    <div>
      {users.map(user => (
        <User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle}></User>
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

  const onChange = (e)=> {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]:value
    });
  };

  const [users, setUsers] = useState([
    {id:1, username:"홍길동", email:"hong@abc.com", active: false},
    {id:2, username:"이순신", email:"lee@abc.com", active: true}
  ]);

  const nextId = useRef(3);
  const onCreate = ()=> {
    console.log('idnum',nextId);
    const user = {
      id : nextId.current,
      username,
      email
    };
    setUsers([...users, user]);
    console.log('user',user);
    setInputs({
      username:"",
      email:""
    });
    nextId.current += 1;
  };

  const onRemove = (id)=> {
    setUsers(users.filter(user => user.id !== id));
  };

  const onToggle = (id)=> {
    setUsers(
      users.map(user=>
        user.id === id ? {...user, active:!user.active}:user
      )
    );
  };

  return (
    <div className="App">
      <CreateUser 
      username={username}
      email={email}
      onChange={onChange}
      onCreate={onCreate}
      ></CreateUser>
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
    </div>
  );
}

export default App;