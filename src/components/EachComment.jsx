import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { __eraseComment, __modifyComment } from '../redux/modules/commentSlice';
import { ButtonSmall, FlexHorizontal } from '../variables/styleStore'
import useLoginInput from '../variables/useLoginInput';
import styled from 'styled-components';

function EachComment({ dataObj }) {
    const [mode, setMode] = useState(true);
    const [commentValue, commentChangeHandler] = useLoginInput(dataObj.comment);
    const dispatch = useDispatch();

    const eraseCommentHandler = (id) => {
        console.log("이레이즈 id : ", id);
        const payload = {
            id,
        }
        dispatch(__eraseComment(payload));
    }

    const modifyCommentHandler = (e) => {
        e.preventDefault();
        const payload = {
            id : dataObj.id,
            comment : commentValue,
        }
        dispatch(__modifyComment(payload));
        setMode((prev) => !prev);
    }

    return (
        <StForm onSubmit={modifyCommentHandler}>
            <FlexHorizontal justifyContent='space-between'>
                <NicknameBox>
                    {dataObj.nickname}
                </NicknameBox>
                <CommentBox>
                    {mode
                        ? dataObj.comment
                        : <input
                            value={commentValue}
                            onChange={commentChangeHandler}
                        />}
                </CommentBox>
                <ButtonBox>
                    {mode
                        ? (
                            <>
                                <ButtonSmall
                                    type='button'
                                    onClick={() => eraseCommentHandler(dataObj.id)}
                                >삭제</ButtonSmall>
                                <ButtonSmall
                                    type='button'
                                    onClick={() => setMode(prev => !prev)}
                                    others='margin-left:10px;'
                                >수정</ButtonSmall>
                            </>)
                        : (
                            <>
                                <ButtonSmall
                                    type='submit'
                                    onCheck={() => modifyCommentHandler(dataObj.id, dataObj.comment)}
                                >수정완료</ButtonSmall>
                            </>
                        )
                    }
                </ButtonBox>
            </FlexHorizontal>
        </StForm>
    )
}

export default EachComment;


const NicknameBox = styled.div`
    width: 10%;
`
const CommentBox = styled.div`
    width: auto;
    min-width: 70%;
`
const ButtonBox = styled.div`
    text-align: right;
    width: fit-content;
`
const StForm = styled.form`
    width: 100%;
`