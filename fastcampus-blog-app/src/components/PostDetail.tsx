import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import Loader from "./Loader";
import { PostProps } from "./PostList";

const PostDetail = () => {
  const [post, setPost] = useState<PostProps | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      setPost({ ...docSnap.data(), id: docSnap.id } as PostProps);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (confirm && post && post.id) {
      await deleteDoc(doc(db, "posts", post.id));
      toast.success("게시글을 삭제했습니다.");
      navigate("/");
    }
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
            <div className="post__category">{post?.category}</div>
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
