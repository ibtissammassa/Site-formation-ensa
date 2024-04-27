export default function HorizontalInputGroup({ children }) {
  return (
    <div className="flex sm:flex-row flex-col sm:gap-4 gap-8 sm:mb-4">
      {children.map((element, index) => (
        <div className="sm:w-1/2" key={index}>
          {element}
        </div>
      ))}
    </div>
  );
}
