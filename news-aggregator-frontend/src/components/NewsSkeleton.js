const NewsSkeleton = () => (
  <div className="card flex flex-col shadow-box shadow-xl select-none animate-pulse">
    <div className="rounded-t-lg overflow-hidden">
      <div className="w-full h-56 bg-gray-300"></div>
    </div>
    <div className="card-content flex-grow p-6 flex flex-col justify-between gap-7 rounded-b-lg bg-white">
      <div className="text-justify mb-auto">
        <p className="text-gray-600 bg-gray-300 h-4"></p>
      </div>
      <div className="text-left">
        <p className="bg-gray-300">
          <span className="font-bold text-gray-300 w-10 h-4">a</span>
        </p>
      </div>
    </div>
  </div>
)


export default NewsSkeleton