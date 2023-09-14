import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import Logo from "../assets/imagee.jpg"

export default function Contacts({ contacts, currentUser, changeChat }) {
    const [currentUserName, setCurrentUserName ] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        if(currentUser){
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser]);
    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };
    return <>
    {
        currentUserImage && currentUserName && (
            <Container>
                <div className="brand">
                    <img src={Logo} alt="logo" />
                    <h3>TChat</h3>
                </div>

                <div className="contacts">{
                    contacts.map((contact,index) => {
                        return (
                            <div 
                                key={index} 
                                className={`contact ${index === currentSelected ? "selected" : ""}`}
                                onClick={() => changeCurrentChat(index, contact)}
                            >

                                <div className="avatar">
                                    <img 
                                        src={`data:image/svg+xml;base64 , ${contact.avatarImage}`} 
                                        alt="avatar" />
                                </div>

                                <div className="username">
                                    <h3>{contact.username}</h3>
                                </div>

                            </div>
                        )
                    })

                }
                </div>

                <div className="current-user">
                    <div className="avatar">
                        <img 
                            src={`data:image/svg+xml;base64 , ${currentUserImage}`} 
                            alt="avatar" />
                    </div>
                    <div className="username">
                        <h2>{currentUserName}</h2>
                    </div>
                </div>

            </Container>
        )
    }
    </>
}


const Container = styled.div`
    display: grid;
    grid-template-rows: 12% 70% 18%;
    overflow: hidden;
    background-color: #00000076;
        
    .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        
        img{
            height: 2.5rem;
            border-radius: 1.5rem;
        }

        h3{
            color: white;
            text-transform: uppercase;
            font-family: cursive;
        }
    }

    .contacts{
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap:  0.8rem;
        color: white;
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 0.1rem;
            }
        }
        .contact {
            background-color: #ffffff39;
            min-height : 5rem;
            width: 90%;
            cursor: pointer;
            border-radius: 0.2rem;
            padding: 0.4rem;
            gap: 1rem;
            align-items: center;
            display: flex;
            transition: 0.5s ease-in-out;

            .avatar {
                img{
                    height: 3rem;
                }
            }

            .username {
                h3{
                    color: white;
                }
            }
            @media screen and (min-width: 360px) and (max-width: 720px) {
                padding: 0.2rem;
                min-height: 3.5rem;
                gap: 0.3rem;

                .avatar{
                    display: flex;
                    align-items: center;
                    img {
                        height: 2.5rem;
                    }
                }
                .username {
                    h3{
                        font-size: 1rem;
                    }
                }
            }
        }
        .selected {
        background-color: #007270;
        }
    }

    .current-user {
        background-color: #4e00ff;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;

        .avatar {
            img{ 
                height: 4rem;
                max-inline-size: 100%;
            }
        }
        .username {
            h2 {
                color: white;
            }
        }
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            gap: 1rem;
            .username {
                h2 {
                    font-size: 1rem;
                }
            }
        }

        @media screen and (min-width: 360px) and (max-width: 720px) {
            gap: 0.5rem;
            .username {
                h2 {
                    font-size: 1rem;
                }
            }
            .avatar {
            img{ 
                height: 3rem;
                max-inline-size: 100%;
            }
        }
        }
    }
`;