export function getDisplayDate(date){
    // date is a Date object
    // return string that looks like 'Jan 2019'
    var mon = new Intl.DateTimeFormat('en',{ month: 'short'}).format(date);
    var year = new Intl.DateTimeFormat('en',{ year: 'numeric' }).format(date);
    return mon+' '+year;
}

export function parseToDate(str){
    // str is a date string recieved from the server
    // in the format of YYYY-MM-DD
    if(str === null)
        return null;

    var parts = str.split('-');
    return new Date(parts[0], parts[1] - 1, parts[2]);

}

export function splitTextToPara(str){
    // 1 new line = <br>, 2 new line = new para

    var list = str.split("\n\n");
    list = list.map((val)=>val.split("\n"));

    return (
        <span>
        {
            list.map(para=>{
                return (
                    <p>
                    {
                        para.map(line=>{
                            return <span>{line}<br/></span>
                        })
                    }
                    </p>
                )
            })
        }
        </span>
    )

}