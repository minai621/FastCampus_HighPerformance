import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "pages/home";
import { useCallback, useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const PostEditForm = () => {
  const { id } = useParams();
  const [content, setContent] = useState<string>("");

  const [post, setPost] = useState<PostProps | null>(null);
  const navigate = useNavigate();

  const getPost = useCallback(async () => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      setPost({
        ...(docSnap?.data() as PostProps),
        id: docSnap?.id,
      });
      setContent(docSnap?.data()?.content);
    }
  }, [id]);

  useEffect(() => {
    if (id) getPost();
  }, []);

  const handleFileUpload = () => {};

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (post) {
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          content: content,
        });
      }

      navigate(`/posts/${post?.id}`);
      toast.success("게시글을 수정했습니다.");
    } catch (e: any) {
      console.log(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "content") {
      setContent(value);
    }
  };
  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <textarea
        className="post-form__textarea"
        required
        name="content"
        id="content"
        placeholder="What is happening?"
        value={content}
        onChange={handleChange}
      />
      <div className="post-form__submit-area">
        <label htmlFor="file-input" className="post-form__file">
          <FiImage className="post-form__file-icon" />
        </label>
        <input
          type="file"
          name="file-input"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />
        <input type="submit" value="수정" className="post-form__submit-btn" />
      </div>
    </form>
  );
};

export default PostEditForm;
