type CardHeaderProps = {
  icon: any;
  title: string;
  description: string;
};

const CardHeader = ({ icon: Icon, title, description }: CardHeaderProps) => {
  return (
    <div className="flex items-center gap-2 font-medium">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <h2 className="text-base font-semibold leading-none">{title}</h2>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
};

export default CardHeader;
