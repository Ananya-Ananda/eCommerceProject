const usStates = ['AL','AK','AZ','AR','CA','CO','CT','DE',
'FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY',
'NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
'VA','WA','WV','WI','WY'
];

const styles ={
    split: {
        flex:"1",
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-between",
    },
    container:{
        marginLeft:"20%",
        marginRight:"20%",
        padding:'3%',
        boxShadow: '0px 0px 15px #67696b',
        borderRadius:"8%"
    },
    twoTxt:{
        margin:"1%",
        backgroundColor: 'white', 
        width:"48%"
    },
    fullWidthTxt:{
        margin:"1%",
        backgroundColor: 'white',
        width:"98%"
    },
    threeTxt:{
        margin:"1%",
        backgroundColor: 'white', 
        width:"31%"
    }
}
export {usStates,styles};