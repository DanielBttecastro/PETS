using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace PETS.Models;

public partial class DbPetsContext : DbContext
{
    public DbPetsContext()
    {
    }

    public DbPetsContext(DbContextOptions<DbPetsContext> options)
        : base(options)
    {
    }

    public virtual DbSet<IntMascotaMedicamento> IntMascotaMedicamentos { get; set; }

    public virtual DbSet<TblCliente> TblClientes { get; set; }

    public virtual DbSet<TblMascota> TblMascotas { get; set; }

    public virtual DbSet<TblMedicamento> TblMedicamentos { get; set; }

    public virtual DbSet<TblMedico> TblMedicos { get; set; }

    public virtual DbSet<TblRaza> TblRazas { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive info  rmation in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(local); Database=DB_PETS; Integrated Security=true; TrustServerCertificate=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<IntMascotaMedicamento>(entity =>
        {
            entity.HasKey(e => e.idIntermedia).HasName("PK__int_Masc__D23C9B858308031A");

            entity.ToTable("int_MascotaMedicamento");
            entity.Property(e => e.idIntermedia).HasColumnName("idIntermedia");
            entity.Property(e => e.Dosis).HasMaxLength(50);
            entity.Property(e => e.IdMascota).HasColumnName("idMascota");
            entity.Property(e => e.IdMedicamento).HasColumnName("idMedicamento");
            entity.Property(e => e.IdMedico).HasColumnName("idMedico");

            entity.HasOne(d => d.IdMascotaNavigation).WithMany()
                .HasForeignKey(d => d.IdMascota)
                .HasConstraintName("FK__int_Masco__idMas__2D27B809");

            entity.HasOne(d => d.IdMedicamentoNavigation).WithMany()
                .HasForeignKey(d => d.IdMedicamento)
                .HasConstraintName("FK__int_Masco__idMed__2E1BDC42");

            entity.HasOne(d => d.IdMedicoNavigation).WithMany()
                .HasForeignKey(d => d.IdMedico)
                .HasConstraintName("FK_Medico");
        });

        modelBuilder.Entity<TblCliente>(entity =>
        {
            entity.HasKey(e => e.Cedula).HasName("PK__tbl_Clie__415B7BE433E712EB");

            entity.ToTable("tbl_Clientes");

            entity.Property(e => e.Cedula)
                .HasMaxLength(20)
                .HasColumnName("cedula");
            entity.Property(e => e.ApellidoCliente)
                .HasMaxLength(50)
                .HasColumnName("apellidoCliente");
            entity.Property(e => e.Direccion)
                .HasMaxLength(100)
                .HasColumnName("direccion");
            entity.Property(e => e.NombreCliente)
                .HasMaxLength(50)
                .HasColumnName("nombreCliente");
            entity.Property(e => e.Telefono)
                .HasMaxLength(15)
                .HasColumnName("telefono");
        });

        modelBuilder.Entity<TblMascota>(entity =>
        {
            entity.HasKey(e => e.IdMascota).HasName("PK__tbl_Masc__8E0681129D415D41");

            entity.ToTable("tbl_Mascotas");

            entity.Property(e => e.IdMascota)
                .ValueGeneratedNever()
                .HasColumnName("idMascota");
            entity.Property(e => e.ClienteCedula)
                .HasMaxLength(20)
                .HasColumnName("clienteCedula");
            entity.Property(e => e.EdadMascota).HasColumnName("edadMascota");
            entity.Property(e => e.IdRaza).HasColumnName("idRaza");
            entity.Property(e => e.NombreMascota)
                .HasMaxLength(50)
                .HasColumnName("nombreMascota");
            entity.Property(e => e.PesoMascota)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("pesoMascota");

            entity.HasOne(d => d.ClienteCedulaNavigation).WithMany(p => p.TblMascota)
                .HasForeignKey(d => d.ClienteCedula)
                .HasConstraintName("FK__tbl_Masco__clien__2A4B4B5E");

            entity.HasOne(d => d.IdRazaNavigation).WithMany(p => p.TblMascota)
                .HasForeignKey(d => d.IdRaza)
                .HasConstraintName("FK__tbl_Masco__idRaz__2B3F6F97");
        });

        modelBuilder.Entity<TblMedicamento>(entity =>
        {
            entity.HasKey(e => e.IdMedicamento).HasName("PK__tbl_Medi__42B24C58F1FF4FE6");

            entity.ToTable("tbl_Medicamentos");

            entity.Property(e => e.IdMedicamento)
                .ValueGeneratedNever()
                .HasColumnName("idMedicamento");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(200)
                .HasColumnName("descripcion");
            entity.Property(e => e.NombreMedicamento)
                .HasMaxLength(50)
                .HasColumnName("nombreMedicamento");
        });

        modelBuilder.Entity<TblMedico>(entity =>
        {
            entity.HasKey(e => e.IdMedico).HasName("PK__tbl_Medi__4E03DEBA573430C9");

            entity.ToTable("tbl_Medicos");

            entity.Property(e => e.IdMedico)
                .ValueGeneratedNever()
                .HasColumnName("idMedico");
            entity.Property(e => e.ApellidoMedico)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("apellidoMedico");
            entity.Property(e => e.ContraseniaMedico)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("contraseniaMedico");
            entity.Property(e => e.CorreoMedico)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("correoMedico");
            entity.Property(e => e.NombreMedico)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("nombreMedico");
            entity.Property(e => e.TelefonoMedico)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("telefonoMedico");
            entity.Property(e => e.TokenMedico)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("tokenMedico");
        });

        modelBuilder.Entity<TblRaza>(entity =>
        {
            entity.HasKey(e => e.IdRaza).HasName("PK__tbl_Raza__E12566EE28570B9D");

            entity.ToTable("tbl_Razas");

            entity.Property(e => e.IdRaza)
                .ValueGeneratedNever()
                .HasColumnName("idRaza");
            entity.Property(e => e.Nombre).HasMaxLength(50);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
