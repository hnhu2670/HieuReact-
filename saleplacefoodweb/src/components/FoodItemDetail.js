import { useContext, useEffect, useRef, useState } from "react";
import Apis, { authApi, endpoints } from "../configs/Apis";
import { Link, useParams } from "react-router-dom";
import { MyCartContext, MyUserContext } from "../App";
import { Button, Col, Container, Form, Image, ListGroup, Row } from "react-bootstrap";
import MySpinner from "../layout/MySpinner";
import '../resources/css/FoodItemDetail.css'
import cookie from "react-cookies";
import Moment from "react-moment";
import userimg from '../resources/img/usernull.png'

// const FoodItemDetail = () => {

//     const [user,] = useContext(MyUserContext);
//     const { foodId } = useParams();
//     const [, cartDispatch] = useContext(MyCartContext);
//     const [foodItem, setFoodItem] = useState(null);
//     const [newComment, setNewComment] = useState(null);

//     // const [fullComment, setFullComment] = useState({
//     //     "restaurantId": "",
//     //     "foodId": "",
//     //     "comment": "",
//     //     "rating": "",
//     //     "avatar": userimg
//     // })

//     const [comments, setComments] = useState(null);
//     const [rating, setRating] = useState(null);
//     const avatar = useRef();
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const loadFood = async () => {
//             try {
//                 let { data } = await Apis.get(endpoints['detail'](foodId));
//                 setFoodItem(data);

//             } catch (err) {
//                 console.log(err);
//             }
//         }

//         const loadComments = async () => {
//             let { data } = await Apis.get(endpoints['comments'](foodId));

//             setComments(data);
//         }

//         loadFood();
//         loadComments();
//     }, [foodId]);



//     const order = (foodItem) => {
//         cartDispatch({
//             "type": "inc",
//             "payload": 1
//         })


//         let cart = cookie.load("cart") || null;
//         if (cart == null)
//             cart = {};

//         if (foodItem.foodId in cart) { // sản phẩm có trong giỏ
//             cart[foodItem.foodId]["quantity"] += 1;
//         } else { // sản phẩm chưa có trong giỏ
//             cart[foodItem.foodId] = {
//                 "foodId": foodItem.foodId,
//                 "foodName": foodItem.foodName,
//                 "quantity": 1,
//                 "unitPrice": foodItem.price
//             }
//         }

//         cookie.save("cart", cart);
//     }


//     // const addComment = () => {
//     //     setLoading(true);

//     //     let form = new FormData();

//     //     const process = async () => {


//     //         // for (let field in newComment){
//     //         //     form.append(field, newComment[field]);
//     //         // }

//     //         var usernull = new Image();
//     //         usernull.src = userimg;
//     //         form.append("restaurantId", foodItem.restaurantId.restaurantId);
//     //         form.append("foodId", foodItem.foodId);
//     //         form.append("comment", newComment);
//     //         form.append("avatar", avatar.current.files[0]);

//     //         // console.log(form["avatar"]);
//     //         try {
//     //             let { data } = await authApi().post(endpoints['add-comment'],form);
//     //             setComments([...comments, data]);
//     //             setLoading(false);
//     //         } catch (ex) {
//     //             console.log(ex)
//     //         }

//     //         // {
//     //         //     "restaurantId": foodItem.restaurantId.restaurantId, 
//     //         //     "foodId": foodItem.foodId,
//     //         //     "comment": newComment,
//     //         //     "rating": rating,
//     //         //     "avatar": avatar
//     //         // }


//     //     }

//     //     process();
//     // }


//     const addComment = async () => {
//         setLoading(true);

//         let form = new FormData();
//         form.append("restaurantId", foodItem.restaurantId.restaurantId);
//         form.append("foodId", foodItem.foodId);
//         form.append("comment", newComment);
//         form.append("userId", user.userId); // moi them
//         if (avatar.current.files[0] !== undefined) {
//             form.append("avatar", avatar.current.files[0]);
//         } else {
//             form.append("avatar", new Blob());
//         }


//         try {
//             let { data } = await authApi().post(endpoints['add-comment'], form, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             });
//             setComments([...comments, data]);
//             setLoading(false);
//         } catch (ex) {
//             console.log(ex);
//         }
//     };
//     console.log(foodItem)

//     if (foodItem === null || comments === null)
//         return <MySpinner />;


//     let url = `/login?next=/fooddetail/${foodId}`;
//     let url_res = `/restaurant_detail/${foodItem.restaurantId.restaurantId}`
//     return <>

//         <h1 className="text-center text-info mt-2 tieude_fooditem_detail">CHI TIẾT SẢN PHẨM ({foodItem.foodName})</h1>
//         <Row>
//             <Col md={5} xs={6}>
//                 <Image className="img_fooditemdetail" src={foodItem.avatar} rounded fluid />
//             </Col>
//             <Col md={5} xs={6}>
//                 <h2 className="text-danger">{foodItem.foodName}</h2>
//                 <p>{foodItem.description}</p>
//                 <h3>{foodItem.price} VNĐ</h3>
//                 <Button onClick={() => { order(foodItem) }} variant="success">ADD TO CART</Button>
//                 <div className="info_restaurant">
//                     <Link to={url_res} ><Image className="img_restaurant" src={foodItem.categoryfoodId.restaurantId.avatar} roundedCircle /></Link>
//                     <h3>{foodItem.categoryfoodId.restaurantId.restaurantName}</h3>
//                 </div>
//             </Col>
//         </Row>
//         <hr />

//         {user === null ? (
//             <p>
//                 Vui lòng <Link to={url}>đăng nhập</Link> để bình luận!
//             </p>
//         ) : (
//             <>
//                 <Form.Control
//                     as="textarea"
//                     aria-label="With textarea"
//                     value={newComment}
//                     onChange={e => setNewComment(e.target.value)}
//                     placeholder="Nội dung bình luận"
//                 />
//                 <Form.Control
//                     accept=".jpg, .jpeg, .png, .gif, .bmp"
//                     type="file"
//                     ref={avatar}
//                 />
//                 {loading === true ? (
//                     <MySpinner />
//                 ) : (
//                     <Button onClick={addComment} className="mt-2" variant="info">
//                         Bình luận
//                     </Button>
//                 )}
//             </>
//         )}
//         <hr />
//         <ListGroup>
//             {comments.map(c => (
//                 <ListGroup.Item id={c.id} key={c.id}>

//                     <div>
//                         <div className="name_avatar_comment">
//                             <Image src={c.userId.avatar} roundedCircle />
//                             <div>
//                                 <h5>{c.userId.firstname} {c.userId.lastname}</h5>
//                                 <Moment locale="vi" fromNow>{c.createdDate}</Moment>
//                             </div>
//                         </div>
//                         <hr />
//                         <div className="comment_avatar">
//                             <div className="comtain_comment">{c.comment}</div>
//                             <div><Image className="img_comment" src={c.avatar} rounded /></div>
//                         </div>
//                     </div>
//                 </ListGroup.Item>
//             ))}
//         </ListGroup>


//     </>
// }
// export default FoodItemDetail;


// import { useContext, useEffect, useRef, useState } from "react";
// import Apis, { authApi, endpoints } from "../configs/Apis";
// import { Link, useParams } from "react-router-dom";
// import { MyCartContext, MyUserContext } from "../App";
// import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
// import MySpinner from "../layout/MySpinner";
// import '../resources/css/FoodItemDetail.css'
// import cookie from "react-cookies";
// import Moment from "react-moment";
// import userimg from '../resources/img/usernull.png'

// const FoodItemDetail = () => {


//     return <>

//         <h1 className="text-center text-info mt-2 tieude_fooditem_detail">CHI TIẾT SẢN PHẨM ({foodItem.foodName})</h1>
//         <Row>
//             <Col md={5} xs={6}>
//                 <Image className="img_fooditemdetail" src={foodItem.avatar} rounded fluid />
//             </Col>
//             <Col md={5} xs={6}>
//                 <h2 className="text-danger">{foodItem.foodName}</h2>
//                 <p>{foodItem.description}</p>
//                 <h3>{foodItem.price} VNĐ</h3>
//                 <Button onClick={() => { order(foodItem) }} variant="success">ADD TO CART</Button>
//                 <div className="info_restaurant">
//                     <Link to={url_res} ><Image className="img_restaurant" src={foodItem.categoryfoodId.restaurantId.avatar} roundedCircle /></Link>
//                     <h3>{foodItem.categoryfoodId.restaurantId.restaurantName}</h3>
//                 </div>
//             </Col>
//         </Row>
//         <hr />

//         {user === null ? (
//             <p>
//                 Vui lòng <Link to={url}>đăng nhập</Link> để bình luận!
//             </p>
//         ) : (
//             <>
//                 <Form.Control
//                     as="textarea"
//                     aria-label="With textarea"
//                     value={newComment}
//                     onChange={e => setNewComment(e.target.value)}
//                     placeholder="Nội dung bình luận"
//                 />
//                 <Form.Control
//                     accept=".jpg, .jpeg, .png, .gif, .bmp"
//                     type="file"
//                     ref={avatar}
//                 />
//                 {loading === true ? (
//                     <MySpinner />
//                 ) : (
//                     <Button onClick={addComment} className="mt-2" variant="info">
//                         Bình luận
//                     </Button>
//                 )}
//             </>
//         )}
//         <hr />
//         <ListGroup>
//             {comments.map(c => (
//                 <ListGroup.Item id={c.id} key={c.id}>

//                     <div>
//                         <div className="name_avatar_comment">
//                             <Image src={c.userId.avatar} roundedCircle />
//                             <div>
//                                 <h5>{c.userId.firstname} {c.userId.lastname}</h5>
//                                 <Moment locale="vi" fromNow>{c.createdDate}</Moment>
//                             </div>
//                         </div>
//                         <hr />
//                         <div className="comment_avatar">
//                             <div className="comtain_comment">{c.comment}</div>
//                             <div><Image className="img_comment" src={c.avatar} rounded /></div>
//                         </div>
//                     </div>
//                 </ListGroup.Item>
//             ))}
//         </ListGroup>


//     </>
// }
// export default FoodItemDetail;

const FoodItemDetail = () => {


    const [user,] = useContext(MyUserContext);
    const { foodId } = useParams();
    const [, cartDispatch] = useContext(MyCartContext);
    const [foodItem, setFoodItem] = useState(null);
    const [newComment, setNewComment] = useState(null);

    // const [fullComment, setFullComment] = useState({
    //     "restaurantId": "",
    //     "foodId": "",
    //     "comment": "",
    //     "rating": "",
    //     "avatar": userimg
    // })

    const [comments, setComments] = useState(null);
    const [rating, setRating] = useState(null);
    const avatar = useRef();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadFood = async () => {
            try {
                let { data } = await Apis.get(endpoints['detail'](foodId));
                setFoodItem(data);

            } catch (err) {
                console.log(err);
            }
        }

        const loadComments = async () => {
            let { data } = await Apis.get(endpoints['comments'](foodId));

            setComments(data);
        }

        loadFood();
        loadComments();
    }, [foodId]);



    const order = (foodItem) => {
        cartDispatch({
            "type": "inc",
            "payload": 1
        })


        let cart = cookie.load("cart") || null;
        if (cart == null)
            cart = {};

        if (foodItem.foodId in cart) { // sản phẩm có trong giỏ
            cart[foodItem.foodId]["quantity"] += 1;
        } else { // sản phẩm chưa có trong giỏ
            cart[foodItem.foodId] = {
                "foodId": foodItem.foodId,
                "foodName": foodItem.foodName,
                "quantity": 1,
                "unitPrice": foodItem.price
            }
        }

        cookie.save("cart", cart);
    }


    // const addComment = () => {
    //     setLoading(true);

    //     let form = new FormData();

    //     const process = async () => {


    //         // for (let field in newComment){
    //         //     form.append(field, newComment[field]);
    //         // }

    //         var usernull = new Image();
    //         usernull.src = userimg;
    //         form.append("restaurantId", foodItem.restaurantId.restaurantId);
    //         form.append("foodId", foodItem.foodId);
    //         form.append("comment", newComment);
    //         form.append("avatar", avatar.current.files[0]);

    //         // console.log(form["avatar"]);
    //         try {
    //             let { data } = await authApi().post(endpoints['add-comment'],form);
    //             setComments([...comments, data]);
    //             setLoading(false);
    //         } catch (ex) {
    //             console.log(ex)
    //         }

    //         // {
    //         //     "restaurantId": foodItem.restaurantId.restaurantId, 
    //         //     "foodId": foodItem.foodId,
    //         //     "comment": newComment,
    //         //     "rating": rating,
    //         //     "avatar": avatar
    //         // }


    //     }

    //     process();
    // }


    const addComment = async () => {
        setLoading(true);

        let form = new FormData();
        form.append("restaurantId", foodItem.restaurantId.restaurantId);
        form.append("foodId", foodItem.foodId);
        form.append("comment", newComment);
        if (avatar.current.files[0] !== undefined) {
            form.append("avatar", avatar.current.files[0]);
        } else {
            form.append("avatar", new Blob());
        }


        try {
            let { data } = await authApi().post(endpoints['add-comment'], form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setComments([...comments, data]);
            setLoading(false);
        } catch (ex) {
            console.log(ex);
        }
    };
    console.log(foodItem)

    if (foodItem === null || comments === null)
        return <MySpinner />;


    let url = `/login?next=/fooddetail/${foodId}`;
    let url_res = `/restaurant_detail/${foodItem.restaurantId.restaurantId}`

    return (<>
        <div className="detailcontainer">
            <div>
                <section id="detail-top">
                    <Container className="w-90 mx-auto">
                        <Row xs={1} md={2}>
                            <Col className="detail-name">
                                <div><h1>{foodItem.foodName}</h1></div>
                                <div><hr></hr></div>
                                <div><Image className="w-90 " src={foodItem.avatar} thumbnail /></div>
                            </Col>
                            <Col className=" detail-profile pt-10" >
                                <div>
                                    {foodItem.description}
                                </div>
                                <div className="h-15">
                                    <Button className="	btn-addCart h-100" style={{ fontSize: 25 + "px" }}>ADD TO CART</Button>
                                </div>
                                <div className="text-danger" style={{ fontSize: 30 + "px" }}>Giá bán: {foodItem.price} VNĐ</div>
                                <div className="m-0">
                                    <Link style={{ display: "flex" }}>
                                        <div style={{ width: 20 + "%" }}><Link to={url_res}><Image className="w-100 my-auto " src={foodItem.categoryfoodId.restaurantId.avatar} roundedCircle /></Link></div>
                                        <h3 className="my-auto ml-20"> {foodItem.categoryfoodId.restaurantId.restaurantName}</h3>
                                    </Link >
                                </div>

                            </Col>
                        </Row>
                    </Container>
                </section>
                <section id="detail-bottom">
                    <hr />
                    {user === null ? (
                        <p>
                            Vui lòng <Link to={url}>đăng nhập</Link> để bình luận!
                        </p>
                    ) : (
                        <>
                            <Form.Control
                                as="textarea"
                                aria-label="With textarea"
                                value={newComment}
                                onChange={e => setNewComment(e.target.value)}
                                placeholder="Nội dung bình luận"
                            />
                            <Form.Control
                                accept=".jpg, .jpeg, .png, .gif, .bmp"
                                type="file"
                                ref={avatar}
                            />
                            {loading === true ? (
                                <MySpinner />
                            ) : (
                                <Button onClick={addComment} className="mt-2" variant="info">
                                    Bình luận
                                </Button>
                            )}
                        </>
                    )}
                    <hr />
                    <ListGroup>
                        {comments.map(c => {
                            return <ListGroup.Item >
                                <div>
                                    <div className="name_avatar_comment ml-3">
                                        <Image src={c.userId.avatar} roundedCircle />
                                        <div>
                                            <h5>{c.userId.firstname} {c.userId.lastname}</h5>
                                            <Moment locale="vi" fromNow>{c.createdDate}</Moment>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="comment_avatar">
                                        <div className="comtain_comment">{c.comment}</div>
                                        <div className="w-50"><Image className="img_comment w-50" src={c.avatar} rounded /></div>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        })}

                    </ListGroup>
                </section>
            </div>
        </div >
    </>)
}
export default FoodItemDetail



