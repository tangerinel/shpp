export { }
const ipUrl: string = 'https://api.ipify.org/?format=json';
//2.2.2
async function getResponse(url: string): Promise<any> {
    const response: Response = await fetch(url);
    return await response.json();
}

async function getIp(): Promise<string> {
    return (await getResponse(ipUrl)).ip;
}

console.log("my ip is: " + await getIp());

//2.2.3
const nameUrl: string = 'https://random-data-api.com/api/name/random_name';
const namesNum: number = 3;

async function getNames0(): Promise<string[]>{
    const response0: Response = await fetch(nameUrl);
    const response1: Response = await fetch(nameUrl);
    const response2: Response = await fetch(nameUrl);
    let names: string[] = await Promise.all([response0.json(), response1.json(), response2.json()]).then(
        (values) => { return values.map(value => value.name)}
    );
    return names;
}


async function getNames1(): Promise<string[]>{
    let names: string[] = [];
    for(let i=0; i <namesNum; i++) names.push((await getResponse(nameUrl)).name)
    return names;
}

function getNames2(){
 return fetch(nameUrl).then((response)=> response.json()).then((user) => console.log(user.name));
 
}
//2.2.4
const userUrl:string ='https://random-data-api.com/api/users/random_user'
function getFemaleUser1(counter: number){
    fetch(userUrl).then((response)=> response.json()).then((user) =>{
        if(user.gender === "Female"){
            console.log(`Found female user ${user.username} on ${counter} step`);
        } else{
            getFemaleUser1(++counter);
        }
    })
}

async function getFemaleUser2(counter: number){
    const user = await getResponse(userUrl);
    if(user.gender === "Female"){
        console.log(`Found female user ${user.username} on ${counter} step`);
    } else{
       await getFemaleUser2(++counter);
    }
}

//2.2.5
function firstFunction(callback:(ip:string) => void){
    fetch(ipUrl).then((response)=> response.json()).then((user) => {callback(user.ip)});
}
async function secondFunction(){
    firstFunction((ip)=> console.log("Fuction 5: Your ip is " + ip));
}

//2.2.6
async function secondFunction1( callback:(ip: string) => void) {
   await getIp().then((value)=>{callback(value)});
}

console.log("0.names = " + await getNames0());
console.log("1.names = " + await getNames1());
console.log("2.names:");
for(let i = 0; i<namesNum; i++)  await getNames2();
await getFemaleUser1(0);
await getFemaleUser2(0);
await secondFunction();
await secondFunction1((ip)=> console.log("Fuction 6: Your ip is " + ip));
