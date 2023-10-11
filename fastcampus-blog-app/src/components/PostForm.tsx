import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";
import { db } from "../firebase";
import { PostProps } from "./PostList";

const PostForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post && post.id) {
        const postRef = doc(db, "posts", post.id);
        await updateDoc(postRef, {
          title,
          summary,
          content,
          updatedAt: new Date().toLocaleDateString(),
        });
        toast.success("게시글을 수정했습니다.");
        navigate(`/posts/${post.id}`);
      } else {
        await addDoc(collection(db, "posts"), {
          title: title,
          summary: summary,
          content: content,
          createdAt: new Date().toLocaleDateString(),
          email: user?.email,
          uid: user?.uid,
        });
        navigate("/");
        toast.success("게시글을 생성했습니다.");
      }
    } catch (e: any) {
      toast.error(e?.code);
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = e;

    if (name === "title") {
      setTitle(value);
    }

    if (name === "summary") {
      setSummary(value);
    }

    if (name === "content") {
      setContent(value);
    }
  };

  const [post, setPost] = useState<PostProps | null>(null);

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      setPost({ ...docSnap.data(), id: docSnap.id } as PostProps);
    }
  };

  useEffect(() => {
    if (id) getPost(id);
  }, [id]);

  useEffect(() => {
    if (post) {
      setTitle(post?.title);
      setSummary(post?.summary);
      setContent(post?.content);
    }
  }, [post]);

  return (
    <form onSubmit={onSubmit} className="form">
      <div className="form__block">
        <label htmlFor="title">제목</label>
        <input
          type="text"
          name="title"
          id="title"
          required
          value={title}
          onChange={onChange}
        />
      </div>
      <div className="form__block">
        <label htmlFor="summary">요약</label>
        <input
          type="text"
          name="summary"
          id="summary"
          required
          value={summary}
          onChange={onChange}
        />
      </div>
      <div className="form__block">
        <label htmlFor="content">내용</label>
        <textarea
          name="content"
          id="content"
          required
          value={content}
          onChange={onChange}
        />
      </div>
      <div className="form__block">
        <input
          type="submit"
          value={post ? "수정" : "제출"}
          className="form__btn--submit"
        />
      </div>
    </form>
  );
};

export default PostForm;
