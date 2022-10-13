// const apiKey = '3_OypruY6npJpKSlYy1hoeqIow2xsppWBjcN6qBrEfa4QLHkYWTRdvI7yyNDRUvF';

const getSongName = () => {
    const tag = document.querySelector('#main > div > div.Root__top-container > div.Root__now-playing-bar > footer > div > div.OgkbKIVYE_mrNpYESylB > div > div.ZcNcu7WZgOAz_Mkcoff3 > div.Q_174taY6n64ZGC3GsKj > div > div > div > div > span > a') as HTMLAnchorElement;
    return tag?.innerText ?? "No data";
}

const getSongAuthor = () => {
    const tag = document.querySelector('#main > div > div.Root__top-container > div.Root__now-playing-bar > footer > div > div.OgkbKIVYE_mrNpYESylB > div > div.ZcNcu7WZgOAz_Mkcoff3 > div.gpNta6i8q3KYJC6WBZQC > div > div > div > div > span > a') as HTMLAnchorElement;
    return tag?.innerText ?? "No data";
}



chrome.runtime.onMessage.addListener( (msg, sender, callback) => {
    if(msg.type == "lyrics") {
        const api = `https://jaydenclim.herokuapp.com/genius/${getSongName()}_${getSongAuthor()}`;
        fetch(api, {
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${api}`,
                // 'Access-Control-Allow-Origin':'*'
            }
        })
        .then(response => {
            if(response.status !== 200) {
                console.error("Couldn't make api call");
                console.log("no");
                return;
            }
            response.json().then((data) => {
                let lyrics = data.lyrics.join('<br>');
                console.log(lyrics);
                callback(lyrics);
            });
            
        })
        .catch(err => {
            console.error(err);
        });
    }
    // else if(msg.type == "status") {
    //     const { checkbox } = msg;
    //     if (checkbox.checked) {
    //         callback("on");
    //     }
    //     else {
    //         callback("off");
    //     }
    // }
    // else if(msg)
    
    return true;

});


