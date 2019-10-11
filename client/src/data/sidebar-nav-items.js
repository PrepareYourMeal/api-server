export default function() {
  return [
    {
      title: "Home",
      to: "/home",
      htmlBefore: '<i class="material-icons">home</i>',
      htmlAfter: ""
    },
    {
      title: "Add New Recipe",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/add-new-recipe",
    },
    {
      title: "Meal Planner",
      htmlBefore: '<i class="material-icons">view_list</i>',
      to: "/plans",
    },
    {
      title: "Inventory",
      htmlBefore: '<i class="material-icons">folder_open</i>',
      to: "/inventory",
    },
    {
      title: "Favorites",
      htmlBefore: '<i class="material-icons">favorite</i>',
      to: "/favorites",
    }
  ];
}
