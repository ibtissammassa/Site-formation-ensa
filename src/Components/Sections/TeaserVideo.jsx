function TeaserVideo() {
    return (
        <div className="flex my-24 lg:my-7 flex-col h-[50vh] lg:h-[95vh] 2xl:px-80 lg:px-40 px-8 text-center gap-9 justify-center items-center">
            <div className="flex flex-col gap-3 items-center">
                <h1 className="md:text-4xl text-3xl font-bold">Découvrez en Avance</h1>
                <p className="text-slate-700 text-sm md:text-base"> Embarquez pour une Aventure Passionnante : Découvrez ce qui vous Attend en Regardant Notre Vidéo Teaser !</p>
            </div>
            <iframe className="w-full rounded-md h-full" src="https://www.youtube.com/embed/oQsjzinK3ks" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen frameBorder="0"></iframe>
        </div>
    );
}

export default TeaserVideo;