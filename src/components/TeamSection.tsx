import { Linkedin, Twitter, Mail } from "lucide-react";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Founding Partner",
      experience: "15 years building scalable healthcare platforms",
      bio: "Former CTO at three healthcare startups. Expert in system architecture and regulatory compliance.",
      image: "/api/placeholder/400/400", // Placeholder - replace with actual images
      social: {
        linkedin: "https://linkedin.com/in/alexchen",
        twitter: "https://twitter.com/alexchen",
        email: "alex@kenkailabs.com"
      }
    },
    {
      name: "Sarah Rodriguez",
      role: "Technical Director",
      experience: "12 years in enterprise delivery at scale",
      bio: "Project lead with expertise in digital transformation and agile methodologies.",
      image: "/api/placeholder/400/400", // Placeholder - replace with actual images
      social: {
        linkedin: "https://linkedin.com/in/sarahrodriguez",
        email: "sarah@kenkailabs.com"
      }
    },
    {
      name: "Marcus Johnson",
      role: "Solutions Architect",
      experience: "10 years in cloud infrastructure and DevOps",
      bio: "Specializes in scalable architecture design and modern development practices.",
      image: "/api/placeholder/400/400", // Placeholder - replace with actual images
      social: {
        linkedin: "https://linkedin.com/in/marcusjohnson",
        twitter: "https://twitter.com/marcusj",
        email: "marcus@kenkailabs.com"
      }
    }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            The Team Behind Kenkai Labs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the experienced professionals who will guide your technology transformation 
            from discovery to delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  {/* Placeholder for actual image */}
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <div className="text-blue-600 font-semibold mb-2">
                  {member.role}
                </div>
                <div className="text-sm text-gray-600 font-medium mb-4">
                  {member.experience}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex justify-center space-x-4">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin size={20} />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                      aria-label={`${member.name} Twitter`}
                    >
                      <Twitter size={20} />
                    </a>
                  )}
                  {member.social.email && (
                    <a
                      href={`mailto:${member.social.email}`}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Values */}
        <div className="mt-16 bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Our Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Results-Driven</h4>
              <p className="text-gray-600 text-sm">
                We measure success by your outcomes, not our hours.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Partnership</h4>
              <p className="text-gray-600 text-sm">
                Your success is our success. We&apos;re in this together.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Innovation</h4>
              <p className="text-gray-600 text-sm">
                We use cutting-edge approaches to solve complex problems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
