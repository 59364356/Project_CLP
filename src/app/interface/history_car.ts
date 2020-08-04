export interface history_car {
    data: 
        {
            _id:string;
            img_car: string;
            img_licenplate: string;
            number_car: string;
            province: string;
            type_car: string;
            color: string;
            door: string;
            gateway: string;
            datetime: string;
        
            register: [
                {
                    user_id: string;
                    user_name: string;
                }
            ];
        }
}

// export interface history_car {
//     data: 
//         {
//             {
//                 "_id": "5f1ac6f3f41726000426c70a",
//                 "img_car": "https://cam-see-car.herokuapp.com/image/4981fbde62ae15bf678105dc818c4c54.png",
//                 "img_licenplate": "https://cam-see-car.herokuapp.com/image/77c2b30c7399fadab45787be32064ebe.png",
//                 "number_car": "7กส155",
//                 "province": "ไม่รู้",
//                 "type_car": "รถตู้",
//                 "color": "ไม่รู้",
//                 "door": "ประตู4",
//                 "gateway": "เข้า",
//                 "datetime": "2020-07-24T11:33:07.685Z",
//                 "register": [
//                     {
//                         "user_id": "5f17f586fa556e3050147ed2",
//                         "user_name": "tester"
//                     },
//                     {
//                         "user_id": "5f043659b00fa50c847a5abc",
//                         "user_name": "tester"
//                     }
//                 ]
//             },
//         ]
        
// }