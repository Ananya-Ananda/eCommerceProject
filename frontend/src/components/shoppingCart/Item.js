import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Item(props) {
    const isbn = props.isbn;
    const [data, setData] = useState();

    useEffect(() => {
        let subData = [];
        axios.get("http://localhost:9000/item/")
        .then((res) => res.json)
        .then((items) => {
            items.forEach((item) => {
                subData.push(item)
            });
            setData(subData);
            console.log(data);
        });
    }, [])

    return (
        <div>
            {isbn}
            {data}
        </div>
    );
}

export default Item;