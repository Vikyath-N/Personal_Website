export default function Page() {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Vikyath Naradasi
        </h1>
        <p className="text-lg text-base-content">
          AI Engineer & Full-Stack Developer
        </p>
        <div className="mt-8">
          <button className="btn btn-primary mr-4">
            <a href="/projects">See Projects</a>
          </button>
          <button className="btn btn-secondary">
            <a href="/resume">Resume</a>
          </button>
        </div>
      </div>
    </div>
  );
}
