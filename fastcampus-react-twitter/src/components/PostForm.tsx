import AuthContext from "context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useState } from "react";
import { FiImage } from "react-icons/fi";
import { toast } from "react-toastify";

const PostForm = () => {
  const { user } = useContext(AuthContext);
  const [tags, setTags] = useState<string[]>([]);
  const [hashtag, setHashTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [content, setContent] = useState<string>("");
  const [imageFile, setImageFile] = useState<string | null>(null);

  const handleFileUpload = () => {};

  const handleSubmit = async (e: any) => {
    setIsSubmitting(true);
    e.preventDefault();

    try {
      await addDoc(collection(db, "posts"), {
        content: content,
        createdAt: new Date()?.toLocaleDateString("ko", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        uid: user?.uid,
        email: user?.email,
        hashTags: tags,
      });

      setTags([]);
      setHashTag("");
      setContent("");
      toast.success("게시글을 생성했습니다.");
      setImageFile(null);
      setIsSubmitting(false);
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

  const onChangeHashTag = (e: any) => {
    setHashTag(e?.target?.value?.trim());
  };

  const handleKeyup = (e: any) => {
    if (e.keyCode === 32 && e.target?.value.trim() !== "") {
      if (tags?.includes(e.target.value?.trim())) {
        toast.error("같은 태그가 있습니다.");
      } else {
        setTags((prev) => (prev?.length > 0 ? [...prev, hashtag] : [hashtag]));
        setHashTag("");
      }
    }
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((val) => val !== tag));
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
      <div className="post-form__hashtags">
        <span className="post-form__hashtags-outputs">
          {tags.map((tag, index) => (
            <span
              className="post-form__hashtags-tag"
              key={index}
              onClick={() => removeTag(tag)}
            >
              #{tag}
            </span>
          ))}
        </span>
        <input
          className="post-form__input"
          name="hashtag"
          id="hashtag"
          placeholder="해시태그 + 스페이스바 입력"
          onChange={onChangeHashTag}
          onKeyUp={handleKeyup}
          value={hashtag}
        />
      </div>
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
        <input type="submit" value="Tweet" className="post-form__submit-btn" />
      </div>
    </form>
  );
};

export default PostForm;
