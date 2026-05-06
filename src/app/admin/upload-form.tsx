"use client";

import { useRef, useState } from "react";
import { createBrowserClient } from "@/utils/supabase/client";

export function AdminUploadForm({
  createProjectAction,
}: {
  createProjectAction: (formData: FormData) => Promise<void>;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [publicUrl, setPublicUrl] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const supabase = createBrowserClient();
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage
      .from("portfolio-images")
      .upload(path, file, { upsert: false });

    if (error) {
      alert("Ngarkimi i fotos dështoi: " + error.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("portfolio-images")
      .getPublicUrl(path);

    setPublicUrl(data.publicUrl);
    setUploading(false);
  }

  return (
    <form action={createProjectAction} className="admin-form-grid">
      {/* Upload zone — full width */}
      <div
        style={{ gridColumn: "1 / -1" }}
        className="upload-zone"
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("dragover"); }}
        onDragLeave={(e) => e.currentTarget.classList.remove("dragover")}
        onDrop={(e) => {
          e.preventDefault();
          e.currentTarget.classList.remove("dragover");
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
      >
        {preview ? (
          <img src={preview} alt="Preview" />
        ) : (
          <p>{uploading ? "Duke ngarkuar..." : "Kliko ose tërhiq foton këtu"}</p>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          style={{ display: "none" }}
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />
        <input type="hidden" name="cover_image" value={publicUrl} />
      </div>

      {/* Fields */}
      <div className="field">
        <label htmlFor="title">Titulli</label>
        <input id="title" name="title" required placeholder="Magazinë Industriale" />
      </div>
      <div className="field">
        <label htmlFor="city">Qyteti</label>
        <input id="city" name="city" required placeholder="Tiranë" />
      </div>
      <div className="field">
        <label htmlFor="category">Kategoria</label>
        <input id="category" name="category" required placeholder="Strukturë Çeliku" />
      </div>
      <div className="field">
        <label htmlFor="year">Viti</label>
        <input id="year" name="year" required placeholder="2026" />
      </div>

      {/* Featured + submit */}
      <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
          <input name="featured" type="checkbox" />
          <span>Shfaq në faqen kryesore</span>
        </label>
        <button
          className="button"
          type="submit"
          disabled={uploading || !publicUrl}
          style={{ opacity: (uploading || !publicUrl) ? 0.5 : 1 }}
        >
          {uploading ? "Duke ngarkuar..." : "Shto projekt"}
        </button>
      </div>
    </form>
  );
}
