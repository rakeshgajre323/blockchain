import React from "react";
import { useNavigate } from "react-router-dom";

const roles = [
  {
    title: "Learner",
    description: "Access and manage your blockchain-verified certificates.",
    route: "/learner-wallet",
    color: "bg-blue-100",
  },
  {
    title: "Issuer",
    description: "Issue verifiable skill credentials securely using blockchain.",
    route: "/issuer-authentication",
    color: "bg-green-100",
  },
  {
    title: "Verifier",
    description: "Verify certificate authenticity instantly and securely.",
    route: "/verifier-portal",
    color: "bg-purple-100",
  },
];

const RoleSelectionCards = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 px-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-center">
      {roles.map((role) => (
        <div
          key={role.title}
          onClick={() => navigate(role.route)}
          className={`${role.color} cursor-pointer rounded-2xl p-6 shadow-sm border hover:shadow-md hover:-translate-y-1 transition-transform duration-200`}
        >
          <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
          <p className="text-gray-600 text-sm">{role.description}</p>
        </div>
      ))}
    </section>
  );
};

export default RoleSelectionCards;
