let messages = document.getElementById('messages')
function renderMessage(data) {
    let theDate = (data.timehh).toString().substr(0, 10);
    let theTime = (data.timehh).toString().substr(11, 8);
    const where = document.createElement('div')
    where.innerHTML = `<b>${data.sender}</b> 
                        <span id="theDate">[${theDate} ${theTime}]</span> 
                        <i>${data.text}</i>
                    <div>`;
    messages.appendChild(where);
}

