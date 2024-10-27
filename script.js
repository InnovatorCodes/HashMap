function HashMap(){
    let capacity=16;
    let storage=new Array(capacity);
    let loadFactor=0.75;
    let keyCount=0;
    let keysInBucket=new Array(capacity);
    keysInBucket.fill(0);
    const hash=function(key){
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i))%capacity;
        }

        return hashCode;
    }
    
    const set=function(key, value){
        if(keyCount+1>loadFactor*capacity){
            let allEntries=entries();
            capacity*=2;
            storage=new Array(capacity);
            keysInBucket=new Array(capacity);
            keysInBucket.fill(0);
            keyCount=0;
            allEntries.forEach((entry)=>set(entry[0],entry[1]));
        }
        let hashedKey=hash(key);
        if(keysInBucket[hashedKey]==0){
            storage[hashedKey]={
                key:key,
                value:value,
                next:null
            };  
            keyCount++;
            keysInBucket[hashedKey]++;
        } 
        else{
            let head=storage[hashedKey];
            while(head.next!=null){
                head=head.next;
            }
            head.next={
                key:key,
                value:value,
                next:null
            }
            keyCount++;
            keysInBucket[hashedKey]++;
        }
    }

    const get=function(key){
        let hashedKey=hash(key);
        if(keysInBucket[hashedKey]==0) return null;
        else{
            let head=storage[hashedKey];
            while(head!=null && head.key!=key){
                head=head.next;
            }
            if(head==null) return null;
            else return head.value;
        }
    }

    const has=function(key){
        let hashedKey=hash(key);
        if(keysInBucket[hashedKey]==0) return false;
        else{
            let head=storage[hashedKey];
            while(head!=null && head.key!=key){
                head=head.next;
            }
            if(head==null) return false;
            else return true;
        }
    }

    const remove=function(key){
        let hashedKey=hash(key);
        if(keysInBucket[hashedKey]==0) return false;
        else if(keysInBucket[hashedKey]==1){
            if(storage[hashedKey].key==key){
                delete storage[hashedKey];
                keysInBucket[hashedKey]--;
                keyCount--;
                return true;
            } 
            else return false;
        }
        else{
            let head=storage[hashedKey];
            if(head.key==key){
                storage[hashedKey]=head.next;
                head=null;
                keysInBucket[hashedKey]--;
                keyCount--;
                return true;
            } 
            else{
                let prev;
                while(head.key!=key && head!=null){
                    prev=head;
                    head=head.next;   
                }
                if(head==null) return false;
                else{
                    prev.next=head.next;
                    keysInBucket[hashedKey]--;
                    keyCount--;
                    return true;
                } 
            }
        }
    }
    const length=()=>keyCount;

    const clear=function(){
        capacity=16;
        storage=new Array(capacity);
        keyCount=0;
        keysInBucket=new Array(capacity);
        keysInBucket.fill(0);
    }
    const keys=function(){
        const allKeys=[];
        for(let i=0;i<capacity;i++){
            if(keysInBucket[i]>0){
                let head=storage[i];
                while(head!=null){
                    allKeys.push(head.key);
                    head=head.next;
                }
            }
        }
        return allKeys;
    }
    const values=function(){
        const allValues=[];
        for(let i=0;i<capacity;i++){
            if(keysInBucket[i]>0){
                let head=storage[i];
                while(head!=null){
                    allValues.push(head.value);
                    head=head.next;
                }
            }
        }
        return allValues;
    }

    const entries=function(){
        const allEntries=[];
        for(let i=0;i<capacity;i++){
            //console.log(i)
            if(keysInBucket[i]>0){
                let head=storage[i];
                while(head!=null){
                    allEntries.push([head.key,head.value]);
                    head=head.next;
                }
            }
        }
        return allEntries;
    }
    return {hash,set,get,has,remove,length,clear,keys,values,entries};
}

let test=HashMap();
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
console.log(test.keys());
console.log(test.length());
test.set('moon', 'silver')
//test.clear();
console.log(test.keys());
console.log(test.length());