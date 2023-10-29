import Loader from "components/Loader/Loader";
import PostBox from "components/PostBox";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "pages/home";
import { useCallback, useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostProps | null>(null);
  const getPost = useCallback(async () => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      setPost({
        ...(docSnap?.data() as PostProps),
        id: docSnap?.id,
      });
    }
  }, [id]);
  useEffect(() => {
    if (id) getPost();
  }, [getPost, id]);
  return (
    <div className="post">
      <div className="post__header">
        <button type="button" onClick={() => navigate(-1)}>
          <FiArrowLeft className="post__header-btn" />
        </button>
      </div>
      {post ? <PostBox post={post} /> : <Loader />}
    </div>
  );
};

export default PostDetailPage;
