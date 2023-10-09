import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase";
import Loader from "./Loader";
import { PostProps } from "./PostList";

const PostDetail = () => {
  const [post, setPost] = useState<PostProps | null>(null);
  const { id } = useParams();

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      setPost({ ...docSnap.data(), id: docSnap.id } as PostProps);
    }
  };

  const handleDelete = () => {
    console.log("delete");
  };

  useEffect(() => {
    if (id) getPost(id);
  }, [id]);

  return (
    <>
      {post ? (
        <div className="post__detail">
          <div className="post__box">
            <div className="post__title">{post?.title}</div>
          </div>
          <div className="post__profile-box">
            <div className="post__profile"></div>
            <div className="post__author-name">{post?.email}</div>
            <div className="post__date">{post?.createdAt}</div>
          </div>
          <div className="post__utils-box">
            <div
              className="post__delete"
              role="presentation"
              onClick={handleDelete}
            >
              삭제
            </div>
            <div className="post__edit">
              <Link to={`/posts/edit/${id}`}>수정</Link>
            </div>
          </div>
          <div className="post__text post__text--pre-wrap">{post?.content}</div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default PostDetail;
