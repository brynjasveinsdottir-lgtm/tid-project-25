import { useState, useEffect } from "react";
import "./PageStyle.css";

import { getPosts } from "../components/Services/getService.js";

import CreatePost from "../components/createPost/CreatePost.jsx";
import Filters from "../components/filters/Filters";
import Post from "../components/post/PostTemplate.jsx";
import TrendingEvents from "../components/trending/TrendingEvents.jsx";
import TrendingThreads from "../components/trending/TrendingThreads.jsx";
import Dialog from "../components/dialog/Dialog.jsx";
import ConfirmDialog from "../components/dialog/ConfirmDialog.jsx";
import Button from "../components/button/Button";

//icons for empty state
import SearchOffIcon from "@mui/icons-material/SearchOff";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const filters = ["Event", "Thread", "Place", "Popular", "New"];
  const [filtersResetKey, setFiltersResetKey] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState([]);
  //FILTER LOGIC
  const filterLogic = {
    category: (post, value) => post.get("category") === value,

    new: (post) => {
      const created = post.get("createdAt");
      const now = new Date();
      return (now - created) / (1000 * 60 * 60 * 24) <= 3;
    },

    popular: (post) => {
      const likes = post.get("likes") || 0;
      return likes >= 2;
    },
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [reloadPosts, setReloadPosts] = useState(true);
  const [error, setError] = useState(null);

  //new (confirm dialog to save draft)
  const [draftText, setDraftText] = useState(""); //(unsaved)
  const [savedDraft, setSavedDraft] = useState(
    localStorage.getItem("postDraft") || ""
  );

  const [saveDraftOpen, setSaveDraftOpen] = useState(false);
  const [deleteDraftOpen, setDeleteDraftOpen] = useState(false);

  function requestCloseCreatePost() {
    if (draftText.trim().length > 0) setSaveDraftOpen(true);
    else if (savedDraft) setDeleteDraftOpen(true);
    else setOpenDialog(false);
  }

  function openCreatePost() {
    setDraftText(localStorage.getItem("postDraft") || "");
    setOpenDialog(true);
  }

  function handleSaveDraft() {
    localStorage.setItem("postDraft", draftText);
    setSavedDraft(draftText);
    setSaveDraftOpen(false);
    setOpenDialog(false);
  }

  function handleDiscardDraft() {
    localStorage.removeItem("postDraft");
    setSavedDraft("");
    setDraftText("");
    setSaveDraftOpen(false);
    setDeleteDraftOpen(false);
    setOpenDialog(false);
  }
  //end of new

  // Get all posts that have category 'Event' from class 'Posts' in db
  // Handle possible errors from getPosts (e.g. network issues) and show retry button
  useEffect(() => {
    async function fetchPosts() {
      setError(null);

      try {
        const results = await getPosts({ type: "All" });
        setPosts(results);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError("Couldn’t load posts. Please try again.");
      } finally {
        setReloadPosts(false);
      }
    }

    if (reloadPosts) fetchPosts();
  }, [reloadPosts]);

  // Handle filter chip toggles
  function handleFilterChange(filterObj, isActive) {
    setSelectedFilters((prev) => {
      if (isActive) {
        return [...prev, filterObj];
      } else {
        return prev.filter(
          (f) => !(f.type === filterObj.type && f.value === filterObj.value)
        );
      }
    });
  }

  const filteredPosts =
    selectedFilters.length > 0
      ? posts.filter((post) =>
          selectedFilters.every((filter) => {
            const fn = filterLogic[filter.type];
            return fn ? fn(post, filter.value) : false;
          })
        )
      : posts;

  return (
    <div className="home-layout">
      {/* LEFT COLUMN: feed */}
      <div className="home-left">
        <h1 className="page-title">Home</h1>

        <button
          className={`input-trigger ${savedDraft ? "draft" : "placeholder"}`}
          onClick={openCreatePost}
        >
          <span className="input-trigger-text">
            {savedDraft ? savedDraft : "Create new post"}
          </span>
          {savedDraft && <span className="chip">Draft</span>}
        </button>

        <Filters
          key={filtersResetKey}
          filterList={filters}
          onFilterChange={handleFilterChange}
        />

        {error && posts.length === 0 && (
          <div className="empty-state">
            <p>{error}</p>
            <Button variant="secondary" onClick={() => setReloadPosts(true)}>
              Retry
            </Button>
          </div>
        )}

        <div className="postContainer">
          {filteredPosts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onDeleted={(deletedId) => {
                setPosts((prev) =>
                  prev.filter((post) => post.id !== deletedId)
                );
              }}
            />
          ))}
          {filteredPosts.length === 0 && selectedFilters.length > 1 && (
            <div className="empty-state">
              <SearchOffIcon />
              <p>No posts match the selected filters...</p>
              <Button
                variant="secondary"
                onClick={() => {
                  setSelectedFilters([]);
                  setFiltersResetKey((k) => k + 1);
                }}
              >
                <FilterListOffIcon />
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: trending events */}
      <aside className="home-right">
        <TrendingEvents />
        <div className="trending-threads-spacer"></div>
        <TrendingThreads />
      </aside>

      {/* CREATE POST DIALOG and CONFIRM DIALOGS */}
      <Dialog
        isOpen={openDialog}
        isDismissible
        title="Create post"
        onClose={requestCloseCreatePost}
      >
        <CreatePost
          draft={draftText}
          setDraft={setDraftText}
          onClose={() => {
            setOpenDialog(false);
            setReloadPosts(true);
          }}
        ></CreatePost>
      </Dialog>

      <ConfirmDialog
        isOpen={saveDraftOpen}
        onClose={() => setSaveDraftOpen(false)}
        onPrimary={handleSaveDraft}
        onSecondary={handleDiscardDraft}
        title="Save changes?"
        msg="You have unsaved changes to your threads post. Save as draft before closing?"
        primaryActionLabel="Save draft"
        secondaryActionLabel="Discard"
        primaryVariant="primary"
        secondaryVariant="secondary"
      />
      <ConfirmDialog
        isOpen={deleteDraftOpen}
        onClose={() => setDeleteDraftOpen(false)}
        onPrimary={handleDiscardDraft}
        onSecondary={() => setDeleteDraftOpen(false)}
        title="Delete draft?"
        msg="Are you sure you want to delete your draft? This action cannot be undone."
        primaryActionLabel="Delete draft"
        secondaryActionLabel="Cancel"
        primaryVariant="destructive"
        secondaryVariant="secondary"
      />
    </div>
  );
}
