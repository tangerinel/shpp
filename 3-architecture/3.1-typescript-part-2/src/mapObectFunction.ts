function mapObject <Input, Output>
(obj: Record<string, Input>, transformer: (arg: Input) => Output): Record<string, Output> {
 return Object.keys(obj).reduce((result, key): Record <string, Output> =>{
    result[key] = transformer (obj[key]);
    return result;
 }, {} as Record<string, Output>)
}
const test = { "roma" : 5, "vasya": 2 };
console.log(mapObject(test, (x)=>x>2))
  