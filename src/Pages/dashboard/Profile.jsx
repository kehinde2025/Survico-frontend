import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const localUser = JSON.parse(localStorage.getItem("user"));
      if (!localUser) {
        setLoading(false);
        return;
      }

      try {
        // Check Firestore first
        const userRef = doc(db, "users", localUser.uid || localUser.id);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUser(userSnap.data());
        } else {
          console.warn("User not found in Firestore, using local data.");
          setUser(localUser); // fallback
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(localUser); // fallback in case Firestore fails
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p className="text-white p-4">Loading profile...</p>;
  if (!user) return <p className="text-white p-4">No user data found.</p>;

  const profileFields = [
    { label: "Name", value: user.name },
    { label: "Email", value: user.email },
    { label: "Phone", value: user.phone },
    { label: "Gender", value: user.gender },
    { label: "Age", value: user.age },
    { label: "Country", value: user.country },
    { label: "State", value: user.state },
    { label: "Role", value: user.role },
  ];

  return (
    <div className="bg-[#140932] min-h-screen text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>

      <div className="bg-[#201547] rounded-lg shadow p-4 space-y-4">
        {profileFields.map((field) => (
          <div
            key={field.label}
            className="flex justify-between items-center border-b border-gray-700 pb-2"
          >
            <span className="font-medium">{field.label}</span>
            <span className="text-right text-gray-300">
              {field.value || "N/A"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
