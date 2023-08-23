// import "./userprofile.scss";

const Profile = () => {
  return (
    // <section>
    //   <div className="user-container_data">
    //     <div className="user-profile">
    //       <img
    //         src="https://images.unsplash.com/photo-1687360440648-ec9708d52086?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=976&q=80"
    //         alt=""
    //       />
    //       <div className="about">
    //         <h2>About Me</h2>
    //         <p>
    //           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
    //           deleniti natus a esse cupiditate nulla nobis est corrupti mollitia
    //           dolorum doloremque nisi cum molestias, sequi at? Architecto vitae
    //           odit fugiat?
    //         </p>
    //       </div>
    //     </div>
    //     <div className="user-info">
    //       <h2>name : Khunkyaw TunWin</h2>
    //       <p>Contact Number :</p>
    //       <span>Address :</span>
    //       <p>Location :</p>
    //     </div>
    //   </div>
    //   {/* <div className="user-update">
    //     <button>Edit</button>
    //     <br />
    //     <button>Delete</button>
    //   </div> */}
    // </section>
    <>
      <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div class="text-center">
          <p class="text-base font-semibold text-indigo-600">404</p>
          <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p class="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </a>
            <a href="#" class="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
};
export default Profile;
