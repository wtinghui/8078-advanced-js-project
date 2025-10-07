// create a reading list

const jsonBinRoot="https://api.jsonbin.io/v3";
const jsonBinID="68e0d616ae596e708f059c80";

const url=jsonBinRoot+"/b/"+jsonBinID+"/latest";
console.log(url);

async function loadData(){
    const response=await axios.get(url);
    return response.data.record;
}

function statusBadge(status){
    if (status=="Want To Read"){
        
    }
}
