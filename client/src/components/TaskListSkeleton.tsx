export default function TaskListSkeleton() {
  return (
    <div className="mt-5 grid grid-cols-3 gap-2">
      {[1, 2, 3].map((el) => (
        <div key={el} className="shadow rounded-md p-4">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-gray-500 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-gray-500 rounded col-span-2"></div>
                  <div className="h-2 bg-gray-500 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-gray-500 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
