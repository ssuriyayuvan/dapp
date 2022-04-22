import React, {useEffect, useState} from 'react'
import './App.css';
import {ethers} from 'ethers';
import ABI from './greeter';

const ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const provider = new ethers.providers.Web3Provider(window.ethereum)
const greeterContract = new ethers.Contract(ADDRESS, ABI, provider);
const signer = provider.getSigner();
function App() {

  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [age, setage] = useState(0);
  const [list, setList] = useState([])
  const [index, setIndex] = useState();
  const [isupdate, setIsUpdate] = useState(false);

useEffect( ()=> {
  (async ()=> {
    let accounts = await provider.send("eth_requestAccounts", []);
    let balance = await provider.getBalance(accounts[0]);
    console.log(ethers.utils.formatEther(balance))
    console.log('accounts', accounts, signer);
    getUser()
    setAddress(accounts[0])
    let contractBalance = await greeterContract.getBalance(accounts[0]);
    console.log('contract balance', ethers.utils.formatUnits(contractBalance))
    console.log('block number',await provider.getBlockNumber())
    // greeterContract.UserAdded().watch({}, '', (err, result)=> {
    //   console.log('err is', err);
    //   console.log('result is', result)
    // })
    // greeterContract.filters.UserAdded({from: 24}, (error, result)=>{
    //   console.log('error', error, result)
    // });
    // myEvent.watch(function(error, result){
    //   console.log('error', error, result)
    // });
  })()

   
  
  // const signer = provider.getSigner()
  // getCurrenctBlock()
},[])

// useEffect(()=>{
  // provider.on({address: ADDRESS},(data)=>{
  //   console.log('event data', data)
  //   getUser()
  // })

  greeterContract.on('UserAdded', (hash, name, metadata, event)=> {
    console.log('user added', hash, name, metadata, event)
  })

  // greeterContract
  

//   greeterContract.on("UserAdded", (name, age, value, event) => {
//     console.log({
//         from: name,
//         to: age,
//         value: value,
//         data: event
//     });
// });
// },[])

const handleSubmit = async (e) => {
  e.preventDefault();
  let approveSigner = await greeterContract.connect(signer);
    console.log('approve signer', approveSigner)
 let user = await approveSigner.addUser(name, age);
 console.log('add user', user)
}

const deleteUser = async(e) => {
  e.preventDefault()
  console.log('index', index)
  let approveSigner = await greeterContract.connect(signer);
  let deleteUser = await approveSigner.deleteUser(index);
  console.log(deleteUser)
}

const updateUser = async(e) => {
  e.preventDefault()
  console.log('index', index)
  let approveSigner = await greeterContract.connect(signer);
  let deleteUser = await approveSigner.deleteUser(index);
  console.log(deleteUser)
}

const isUpdate = () => {

}

const getUser = async () => {
  let userList = await greeterContract.returnUsers();
  setList(userList);
  // variable from sol -> solidity by default create getter and setter for variables
  // console.log('public var',await greeterContract.users(0))
  console.log('user list is', userList)
}

// const getCurrenctBlock =async () => {
//   let currentBlock = await provider.listAccounts();
//   console.log(currentBlock);
// }

  return (
    <div className="App">
      <p>{address}</p>
      <form onSubmit={handleSubmit}>
        
        <label>Name</label>
        <input type="text"  name='name' value={name} onChange={(e)=>{setName(e.target.value)}} /> <br />
        <label>Age</label>
        <input type="number"  name='age' value={age} onChange={(e)=>{setage(e.target.value)}} /> <br />
        <button type='submit'>Submit</button>
      </form>
      <form>
        <input type='number' onChange={(e)=> setIndex(e.target.value)} />
        <button onClick={(e)=>deleteUser(e)} >Delete</button>
      </form>
      <table>
        <thead>
          <tr>
            <td>name</td>
            <td>age</td>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 && list.map((ele, i)=> {
            return (
              <tr key={i}>
                <td>{ele[0]}</td>
                <td>{ele[1]}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
     
    </div>
  );
}

export default App;
