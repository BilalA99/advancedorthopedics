function Avatars() {
  return (
    <div className="flex -space-x-3">
      <img
        className="rounded-full ring-2 ring-white"
        src="https://originui.com/avatar-80-03.jpg"
        width={40}
        height={40}
        alt="Avatar 01"
      />
      <img
        className="rounded-full ring-2 ring-white"
        src="https://originui.com/avatar-80-04.jpg"
        width={40}
        height={40}
        alt="Avatar 02"
      />
      <img
        className="rounded-full ring-2 ring-white"
        src="https://originui.com/avatar-80-05.jpg"
        width={40}
        height={40}
        alt="Avatar 03"
      />
    </div>
  );
}

export { Avatars };