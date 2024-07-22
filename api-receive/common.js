async function fetchKol(){
    const apiUrl = "http://103.146.23.183:4000/api/kols/get-all";
    let kols = [];
    await axios.get(apiUrl).then((res) => {
        kols = res.data;
    })
    return kols;
}

export { fetchKol };